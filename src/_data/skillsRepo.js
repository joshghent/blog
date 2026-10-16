// Star count for the skills repo, read from the GitHub API at build time.
// The page still builds if the API is down or rate limited: stars is null
// and the template drops the count.
module.exports = async function () {
  const repo = "joshghent/skills";
  const headers = { "User-Agent": "joshghent.com", Accept: "application/vnd.github+json" };
  const get = (extra = {}) =>
    fetch(`https://api.github.com/repos/${repo}`, {
      headers: { ...headers, ...extra },
      signal: AbortSignal.timeout(5000),
    });

  try {
    // A token lifts the rate limit; if it is rejected, fall back to an anonymous call.
    const token = process.env.GITHUB_TOKEN;
    let res = await get(token ? { Authorization: `Bearer ${token}` } : {});
    if (token && res.status === 401) res = await get();
    if (!res.ok) throw new Error(`GitHub API returned ${res.status}`);
    const data = await res.json();
    return { repo, url: data.html_url, stars: data.stargazers_count };
  } catch (err) {
    console.warn(`[skillsRepo] star count unavailable: ${err.message}`);
    return { repo, url: `https://github.com/${repo}`, stars: null };
  }
};
