const eleventyNavigationPlugin = require("@11ty/eleventy-navigation");
const pluginRss = require("@11ty/eleventy-plugin-rss");
const tailwind = require("tailwindcss");
const postCss = require("postcss");
const autoprefixer = require("autoprefixer");
const cssnano = require("cssnano");

const postcssFilter = (cssCode, done) => {
  // we call PostCSS here.
  postCss([
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

  eleventyConfig.addWatchTarget("styles/**/*.css");
  eleventyConfig.addNunjucksAsyncFilter("postcss", postcssFilter);

  eleventyConfig.addNunjucksFilter("limit", (arr, limit) =>
    arr.slice(0, limit)
  );

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

  return {
    dir: { input: "src", output: "_site" },
  };
};
