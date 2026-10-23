import {
  buildLinkFile,
  normaliseUrl,
  parseSubmission,
  safeEqual,
  titleFromHtml,
} from "./links.js";

const json = (body, status = 200, headers = {}) =>
  new Response(JSON.stringify(body), {
    status,
    headers: { "content-type": "application/json", ...headers },
  });

function authorised(request, env) {
  const header = request.headers.get("authorization") || "";
  const token = header.replace(/^Bearer\s+/i, "");
  return Boolean(env.API_TOKEN) && Boolean(token) && safeEqual(token, env.API_TOKEN);
}

async function readBody(request) {
  const type = request.headers.get("content-type") || "";
  if (type.includes("application/json")) return request.json();
  if (type.includes("form")) {
    const form = await request.formData();
    const data = {};
    for (const [key, value] of form.entries()) {
      const name = key.replace(/\[\]$/, "");
      data[name] = data[name] === undefined ? value : [].concat(data[name], value);
    }
    return data;
  }
  throw new Error("Unsupported content type");
}

async function fetchTitle(url) {
  try {
    const res = await fetch(url, {
      headers: { "user-agent": "joshghent-links/1.0 (+https://joshghent.com)" },
      signal: AbortSignal.timeout(5000),
      redirect: "follow",
    });
    if (!res.ok || !(res.headers.get("content-type") || "").includes("html")) return null;
    // <title> is almost always in the first few KB.
    const reader = res.body.getReader();
    let html = "";
    const decoder = new TextDecoder();
    while (html.length < 32768) {
      const { done, value } = await reader.read();
      if (done) break;
      html += decoder.decode(value, { stream: true });
      if (/<\/title>/i.test(html)) break;
    }
    reader.cancel().catch(() => {});
    return titleFromHtml(html);
  } catch {
    return null;
  }
}

const b64 = (text) => btoa(String.fromCharCode(...new TextEncoder().encode(text)));

async function commitFile(env, path, content, message) {
  const api = `https://api.github.com/repos/${env.GITHUB_REPO}/contents/${path}`;
  const res = await fetch(api, {
    method: "PUT",
    headers: {
      authorization: `Bearer ${env.GITHUB_TOKEN}`,
      accept: "application/vnd.github+json",
      "user-agent": "joshghent-links-worker",
      "content-type": "application/json",
    },
    body: JSON.stringify({
      message,
      content: b64(content),
      branch: env.GITHUB_BRANCH || "main",
    }),
  });
  return res;
}

async function publish(env, submission) {
  const url = normaliseUrl(submission.url);
  if (!url) return { error: "A valid http(s) URL is required", status: 400 };

  const title = submission.title || (await fetchTitle(url)) || new URL(url).hostname;
  const file = buildLinkFile({ url, title, note: submission.note, date: new Date() });

  let path = file.path;
  let res = await commitFile(env, path, file.body, `link: ${title}`);
  if (res.status === 422) {
    // Same title already posted today: disambiguate rather than overwrite.
    path = path.replace(/\.md$/, `-${Date.now().toString(36)}.md`);
    res = await commitFile(env, path, file.body, `link: ${title}`);
  }
  if (!res.ok) {
    console.error("GitHub commit failed", res.status, await res.text());
    return { error: "Could not save the link", status: 502 };
  }

  const slug = path.replace(/^src\/links\//, "").replace(/\.md$/, "");
  return { location: `${env.SITE_URL}/links/${slug}/`, title };
}

export default {
  async fetch(request, env) {
    const { pathname, searchParams } = new URL(request.url);

    if (pathname === "/micropub" && request.method === "GET") {
      if (!authorised(request, env)) return json({ error: "unauthorized" }, 401);
      const q = searchParams.get("q");
      if (q === "config") return json({ "syndicate-to": [] });
      if (q === "syndicate-to") return json({ "syndicate-to": [] });
      return json({});
    }

    if (request.method !== "POST" || !["/share", "/micropub"].includes(pathname)) {
      return json({ error: "not found" }, 404);
    }
    if (!authorised(request, env)) return json({ error: "unauthorized" }, 401);

    let data;
    try {
      data = await readBody(request);
    } catch (err) {
      return json({ error: err.message }, 415);
    }

    const result = await publish(env, parseSubmission(data));
    if (result.error) return json({ error: result.error }, result.status);

    // Micropub clients expect 201 + Location; the Shortcut gets the same plus a body.
    return json({ url: result.location, title: result.title }, 201, {
      location: result.location,
    });
  },
};
