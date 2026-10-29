import { test } from "node:test";
import assert from "node:assert/strict";
import worker from "../src/index.js";

const env = {
  API_TOKEN: "secret",
  GITHUB_TOKEN: "gh",
  GITHUB_REPO: "joshghent/blog",
  GITHUB_BRANCH: "main",
  SITE_URL: "https://joshghent.com",
};

function mockFetch(handlers) {
  const calls = [];
  globalThis.fetch = async (url, init) => {
    calls.push({ url: String(url), init });
    return handlers(String(url), init, calls.length);
  };
  return calls;
}

const post = (path, body, token = "secret") =>
  new Request(`https://w.example${path}`, {
    method: "POST",
    headers: { "content-type": "application/json", ...(token && { authorization: `Bearer ${token}` }) },
    body: JSON.stringify(body),
  });

test("rejects missing or wrong token", async () => {
  mockFetch(() => new Response("{}"));
  assert.equal((await worker.fetch(post("/share", { url: "https://a.b" }, null), env)).status, 401);
  assert.equal((await worker.fetch(post("/share", { url: "https://a.b" }, "nope"), env)).status, 401);
});

test("rejects non-http urls", async () => {
  mockFetch(() => new Response("{}"));
  const res = await worker.fetch(post("/share", { url: "javascript:alert(1)" }), env);
  assert.equal(res.status, 400);
});

test("share commits a markdown file and returns 201 + Location", async () => {
  const calls = mockFetch((url) => {
    if (url.startsWith("https://example.com")) {
      return new Response("<title>Hello World</title>", { headers: { "content-type": "text/html" } });
    }
    return new Response("{}", { status: 201 });
  });
  const res = await worker.fetch(post("/share", { url: "https://example.com/p", note: "nice" }), env);
  assert.equal(res.status, 201);
  assert.match(res.headers.get("location"), /^https:\/\/joshghent\.com\/links\/\d{4}-\d{2}-\d{2}-hello-world\/$/);
  const put = calls.find((c) => c.url.includes("api.github.com"));
  assert.match(put.url, /contents\/src\/links\/.+-hello-world\.md$/);
  const sent = JSON.parse(put.init.body);
  const md = Buffer.from(sent.content, "base64").toString();
  assert.match(md, /title: "Hello World"/);
  assert.match(md, /nice/);
});

test("retries with a suffix when the file already exists", async () => {
  let puts = 0;
  mockFetch((url) => {
    if (url.includes("api.github.com")) return new Response("{}", { status: puts++ === 0 ? 422 : 201 });
    return new Response("<title>T</title>", { headers: { "content-type": "text/html" } });
  });
  const res = await worker.fetch(post("/micropub", { type: ["h-entry"], properties: { "bookmark-of": ["https://x.y"] } }), env);
  assert.equal(res.status, 201);
  assert.equal(puts, 2);
});
