# Links Worker

A Cloudflare Worker that turns a shared link into `src/links/<date>-<slug>.md` in this
repo (via the GitHub contents API). Cloudflare then rebuilds the site as usual.

Endpoints (all `POST`, `Authorization: Bearer <API_TOKEN>`):

| Route | Body | Use |
| --- | --- | --- |
| `/share` | JSON or form: `url`, optional `title`, `note` | Apple Shortcut |
| `/micropub` | Micropub h-entry (form or JSON), `bookmark-of` + `content` | Micropub clients |

Both reply `201` with a `Location` header and `{ "url", "title" }`. If no title is sent the
Worker fetches the page and uses its `<title>`.

## Deploy

```sh
cd worker
npx wrangler login
# GitHub fine-grained PAT: only this repo, "Contents: Read and write"
npx wrangler secret put GITHUB_TOKEN
# any long random string, e.g. `openssl rand -hex 32`
npx wrangler secret put API_TOKEN
npx wrangler deploy
```

Optionally add a custom route such as `links-api.joshghent.com/*` in the Cloudflare dashboard.

## Apple Shortcut

Create a Shortcut named **Add Link** and turn on *Show in Share Sheet* (accept URLs).

1. **Ask for Input**: type Text, prompt "Comment", allow multiple lines.
2. **Get Contents of URL**
   - URL: `https://<your-worker>/share`
   - Method: `POST`
   - Headers: `Authorization` = `Bearer <API_TOKEN>`
   - Request Body: `JSON`, with fields `url` (Text → *Shortcut Input*) and `note` (Text → *Provided Input*).
3. **Get Dictionary Value** for key `url`, then **Show Notification** with the result.

Keep the token out of iCloud sharing if you share the Shortcut.

## Micropub status

`/micropub` accepts the same static `API_TOKEN`, which is enough for clients where you can
paste a token. Clients that rely on IndieAuth discovery (Quill, Micro.blog's external-site
mode) also need an authorization and token endpoint advertised from the site; that is the
next step, then fill in `indieweb.micropub` and the endpoint fields in
`src/_data/metadata.json`.

## Tests

```sh
cd worker && npm test
```
