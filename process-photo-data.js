const data = require("./data/photos.json");

const urls = [];
data.photos.map((x) => {
  const last =
    x.derivatives[
      Object.keys(x.derivatives)[Object.keys(x.derivatives).length - 1]
    ];

  urls.push(last.url);
});

console.log(urls);
