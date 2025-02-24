const path = require("path");
const fs = require("fs").promises;

const recordCarbon = async () => {
  const carbon = await fetch(
    "https://api.websitecarbon.com/b?url=joshghent.com"
  );
  const carbonJSON = await carbon.json();

  const dataFilePath = path.join("..", "src", "_data", "carbon.js");

  console.log(carbonJSON);

  // Write the data to the file
  await fs.writeFile(
    dataFilePath,
    `module.exports = () => (${JSON.stringify(carbonJSON.c)});`
  );
};

recordCarbon().then(() => console.log("Carbon data recorded!"));

module.exports = recordCarbon;
