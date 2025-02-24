const eleventyNavigationPlugin = require("@11ty/eleventy-navigation");
const pluginRss = require("@11ty/eleventy-plugin-rss");
const tailwind = require("tailwindcss");
const postCss = require("postcss");
const autoprefixer = require("autoprefixer");
const cssnano = require("cssnano");
const fs = require("fs").promises;
const path = require("path");

const postcssFilter = (cssCode, done) => {
  // we call PostCSS here.
  postCss([
    // @ts-ignore
    tailwind(require("./tailwind.config")),
    autoprefixer(),
    cssnano({ preset: "default" }),
  ])
    .process(cssCode, {
      from: "./src/styles/main.css",
    })
    .then(
      (r) => done(null, r.css),
      (e) => done(e, null)
    );
};

module.exports = function (eleventyConfig) {
  eleventyConfig.addPlugin(eleventyNavigationPlugin);
  eleventyConfig.addPlugin(pluginRss);
  eleventyConfig.addPassthroughCopy("src/img");

  eleventyConfig.addPassthroughCopy({ static: "/" });

  eleventyConfig.addWatchTarget("styles/**/*.css");
  eleventyConfig.addNunjucksAsyncFilter("postcss", postcssFilter);

  eleventyConfig.addNunjucksFilter("limit", (arr, limit) =>
    arr.slice(0, limit)
  );

  eleventyConfig.addCollection("posts", (collection) => {
    return [...collection.getFilteredByGlob("./src/blog/posts/**/*.md")].filter(
      (post) => !post.data.draft
    );
  });

  eleventyConfig.addFilter("splitlines", function (input) {
    const parts = input.split(" ");
    const lines = parts.reduce(function (prev, current) {
      if (!prev.length) {
        return [current];
      }

      let lastOne = prev[prev.length - 1];

      if (lastOne.length + current.length > 19) {
        return [...prev, current];
      }

      prev[prev.length - 1] = lastOne + " " + current;

      return prev;
    }, []);

    return lines;
  });

  eleventyConfig.addCollection("drafts", (collection) => {
    return [...collection.getFilteredByGlob("./src/blog/posts/**/*.md")]
      .filter((item) => item.data.draft)
      .sort((a, b) => b.date - a.date);
  });

  const { DateTime } = require("luxon");

  // https://html.spec.whatwg.org/multipage/common-microsyntaxes.html#valid-date-string
  eleventyConfig.addFilter("htmlDateString", (dateObj) => {
    return DateTime.fromJSDate(dateObj, {
      zone: "utc",
    }).toFormat("yy-MM-dd");
  });

  eleventyConfig.addFilter("readableDate", (dateObj) => {
    return DateTime.fromJSDate(dateObj, {
      zone: "utc",
    }).toFormat("MMM d, yyyy");
  });

  eleventyConfig.addFilter("fromISO", (isoDate) => {
    if (!(isoDate instanceof Date) && typeof isoDate !== "string") {
      // If the input is neither a Date object nor a string, return a placeholder or an error message
      return "Invalid Date";
    }

    // Convert Date object to ISO string if necessary
    let isoDateStr =
      isoDate instanceof Date ? isoDate.toISOString() : String(isoDate);

    return DateTime.fromISO(isoDateStr, {
      zone: "utc",
    }).toFormat("MMMM d, yyyy");
  });

  eleventyConfig.addFilter("postDate", (dateObj) => {
    return DateTime.fromJSDate(dateObj, {
      zone: "Europe/London",
    })
      .setLocale("en")
      .toISODate();
  });

  eleventyConfig.addShortcode("openGraphScreenshotURL", function () {
    const encodedURL = encodeURIComponent(
      `https://joshghent.com/social${this.page.url}`
    );
    const cacheKey = `_${new Date().valueOf()}`;
    return `https://v1.screenshot.11ty.dev/${encodedURL}/opengraph/${cacheKey}`;
  });

  eleventyConfig.addFilter('padStart', function(value, length, char) {
    return String(value).padStart(length, char);
  });

  eleventyConfig.addFilter('dateToISO', (date) => {
    return date.toISOString().split('T')[0];
  });

  return {
    dir: { input: "src", output: "_site" },
  };
};
