// Rejects Jinja2 syntax that Nunjucks accepts and silently ignores.
//
// Nunjucks looks enough like Jinja2 that Jinja idioms read as correct, but it
// implements only some of them. `{% for item in items if item.active %}` is the
// dangerous case: Nunjucks parses the tag, finds nothing to iterate, and renders
// an empty block. The build still exits 0, so the page just loses a section.
import { readdirSync, readFileSync } from "node:fs";
import { join } from "node:path";

const ROOT = new URL("../src/", import.meta.url).pathname;

const templates = readdirSync(ROOT, { recursive: true })
  .filter((name) => name.endsWith(".njk") || name.endsWith(".md"))
  .map((name) => join(ROOT, name));

// Everything inside a {% for %} tag, so a following {% if %} block is not matched.
const FOR_TAG = /\{%-?\s*for\b[^%]*?-?%\}/g;
const INLINE_CONDITION = /\sif\s/;

const failures = [];

for (const path of templates) {
  const source = readFileSync(path, "utf8");
  for (const match of source.matchAll(FOR_TAG)) {
    if (!INLINE_CONDITION.test(match[0])) continue;
    const line = source.slice(0, match.index).split("\n").length;
    failures.push({ path: path.replace(ROOT, "src/"), line, tag: match[0].trim() });
  }
}

for (const failure of failures) {
  console.log(`${failure.path}:${failure.line}`);
  console.log(`  ${failure.tag}`);
  console.log("  Nunjucks ignores the inline condition and renders nothing.");
  console.log("  Use the filterBy filter instead, or an {% if %} inside the loop.\n");
}

console.log(
  failures.length
    ? `${failures.length} template ${failures.length === 1 ? "problem" : "problems"} found in ${templates.length} files`
    : `No template problems found in ${templates.length} files`
);
process.exit(failures.length ? 1 : 0);
