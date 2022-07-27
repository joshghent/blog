const data = require("./_data/photos.json");

const urls = [];
data.photos.map((x) => {
  const last =
    x.derivatives[
      Object.keys(x.derivatives)[Object.keys(x.derivatives).length - 1]
    ];

  return urls.push(last.url);
});

console.log(urls);
