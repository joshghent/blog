// Pure helpers: turn a shared link into the markdown file the Eleventy site expects.

export function slugify(text) {
  const slug = String(text)
    .toLowerCase()
    .replace(/[^\w\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .slice(0, 60)
    .replace(/-$/, "");
  return slug || "link";
}

export function normaliseUrl(input) {
  let url;
  try {
    url = new URL(String(input).trim());
  } catch {
    return null;
  }
  if (url.protocol !== "http:" && url.protocol !== "https:") return null;
  return url.toString();
}

export function titleFromHtml(html) {
  const match = /<title[^>]*>([\s\S]*?)<\/title>/i.exec(html);
  if (!match) return null;
  const title = match[1]
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#0?39;/g, "'")
    .replace(/\s+/g, " ")
    .trim();
  return title || null;
}

export function buildLinkFile({ url, title, note, date }) {
  const iso = date.toISOString();
  const day = iso.slice(0, 10);
  const path = `src/links/${day}-${slugify(title)}.md`;
  // JSON strings are valid YAML double-quoted scalars, so this is always safe to embed.
  const body = [
    "---",
    `title: ${JSON.stringify(title)}`,
    `bookmark_of: ${JSON.stringify(url)}`,
    `date: ${iso}`,
    "---",
    note ? `${note.trim()}\n` : "",
  ].join("\n");
  return { path, body };
}

// Accepts the Shortcut's JSON/form body or a Micropub h-entry (form or JSON).
export function parseSubmission(data) {
  const first = (v) => (Array.isArray(v) ? v[0] : v);
  const props = data.properties || null;
  const get = (key) => (props ? first(props[key]) : first(data[key]));

  const rawContent = get("content");
  const content =
    rawContent && typeof rawContent === "object" ? rawContent.text || rawContent.html : rawContent;

  return {
    url: get("bookmark-of") || get("url"),
    title: get("name") || get("title") || null,
    note: content || get("note") || "",
  };
}

export function safeEqual(a, b) {
  const x = new TextEncoder().encode(String(a));
  const y = new TextEncoder().encode(String(b));
  let diff = x.length ^ y.length;
  for (let i = 0; i < Math.max(x.length, y.length); i++) {
    diff |= (x[i] || 0) ^ (y[i] || 0);
  }
  return diff === 0;
}
