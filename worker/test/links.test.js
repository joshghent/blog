import { test } from "node:test";
import assert from "node:assert/strict";
import {
  buildLinkFile,
  normaliseUrl,
  parseSubmission,
  safeEqual,
  slugify,
  titleFromHtml,
} from "../src/links.js";

test("slugify trims punctuation and length", () => {
  assert.equal(slugify("Partials: Happy Compromise!"), "partials-happy-compromise");
  assert.equal(slugify("!!!"), "link");
  assert.ok(slugify("a ".repeat(100)).length <= 60);
});

test("normaliseUrl only allows http(s)", () => {
  assert.equal(normaliseUrl("https://example.com/a b"), "https://example.com/a%20b");
  assert.equal(normaliseUrl("javascript:alert(1)"), null);
  assert.equal(normaliseUrl("not a url"), null);
});

test("titleFromHtml decodes entities", () => {
  assert.equal(titleFromHtml("<title> A &amp; B\n</title>"), "A & B");
  assert.equal(titleFromHtml("<p>none</p>"), null);
});

test("buildLinkFile escapes hostile titles and notes safely", () => {
  const { path, body } = buildLinkFile({
    url: "https://example.com/",
    title: 'He said "hi"\n---\nevil: true',
    note: "My note",
    date: new Date("2026-10-22T10:00:00Z"),
  });
  assert.match(path, /^src\/links\/2026-10-22-.+\.md$/);
  const frontmatter = body.split("\n---\n")[0];
  assert.equal(frontmatter.split("\n").filter((l) => l.startsWith("evil")).length, 0);
  assert.ok(body.includes("bookmark_of: \"https://example.com/\""));
  assert.ok(body.endsWith("My note\n"));
});

test("parseSubmission handles Shortcut, form and JSON Micropub shapes", () => {
  assert.deepEqual(parseSubmission({ url: "https://a.b", note: "hi" }), {
    url: "https://a.b",
    title: null,
    note: "hi",
  });
  assert.equal(parseSubmission({ "bookmark-of": "https://a.b", content: "x" }).note, "x");
  const mf2 = parseSubmission({
    type: ["h-entry"],
    properties: { "bookmark-of": ["https://a.b"], content: [{ html: "<b>x</b>" }], name: ["T"] },
  });
  assert.equal(mf2.url, "https://a.b");
  assert.equal(mf2.title, "T");
  assert.equal(mf2.note, "<b>x</b>");
});

test("safeEqual", () => {
  assert.ok(safeEqual("abc", "abc"));
  assert.ok(!safeEqual("abc", "abd"));
  assert.ok(!safeEqual("abc", "abcd"));
});
