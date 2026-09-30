// Serves _site and runs pa11y (WCAG 2.1 AA) over a sample of pages.
// Exits non-zero on any error, which fails CI.
import { createServer } from "node:http";
import { readFile } from "node:fs/promises";
import { extname, join } from "node:path";
import pa11y from "pa11y";
import puppeteer from "puppeteer";

const ROOT = new URL("../_site/", import.meta.url).pathname;
const PORT = 8123;
const PAGES = ["/", "/blog/", "/cv/", "/now/", "/links/", "/referrals/", "/zsh-speed/"];

const TYPES = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".svg": "image/svg+xml",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".ico": "image/x-icon",
  ".xml": "application/xml",
};

const server = createServer(async (req, res) => {
  const url = decodeURIComponent(req.url.split("?")[0]);
  const file = join(ROOT, url.endsWith("/") ? `${url}index.html` : url);
  try {
    const body = await readFile(file);
    res.writeHead(200, { "content-type": TYPES[extname(file)] || "application/octet-stream" });
    res.end(body);
  } catch {
    res.writeHead(404).end("not found");
  }
});

await new Promise((resolve) => server.listen(PORT, resolve));

const browser = await puppeteer.launch({ args: ["--no-sandbox"] });

let failures = 0;
for (const path of PAGES) {
  for (const theme of ["light", "dark"]) {
    // The theme is read from localStorage by an inline script, so seed it before navigation.
    const page = await browser.newPage();
    await page.evaluateOnNewDocument((t) => {
      try {
        localStorage.setItem("theme", t);
      } catch {}
    }, theme);

    const { issues } = await pa11y(`http://localhost:${PORT}${path}`, {
      standard: "WCAG2AA",
      runners: ["axe", "htmlcs"],
      browser,
      page,
    });
    await page.close();
    const errors = issues.filter((i) => i.type === "error");
    failures += errors.length;
    console.log(`${errors.length ? "FAIL" : "  ok"}  ${path} (${theme})`);
    for (const e of errors) console.log(`      ${e.code}\n      ${e.message}\n      ${e.selector}`);
  }
}

await browser.close();
server.close();
console.log(failures ? `\n${failures} accessibility errors` : "\nNo accessibility errors");
process.exit(failures ? 1 : 0);
