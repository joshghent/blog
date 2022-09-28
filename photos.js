/* eslint-disable */
const { getImages } = require("icloud-shared-album");
const Path = require("path");
const fs = require("fs");
const Request = require("request");
const dotenv = require("dotenv");

const FILENAME = "./_data/photos.json";

dotenv.config();

(async () => {
  if (!fs.existsSync(FILENAME)) {
    console.error(`File ${FILENAME} not found`);
    return;
  }
  let uploadedItems = require(FILENAME);

  const data = await getImages(String(process.env.ICLOUD_ALBUM_ID));

  if (!data || !data.photos.length) return;

  const extractFilenameFromURL = (URL) => {
    return Path.basename(URL).split("?")[0];
  };

  const downloadImage = (guid, filename, URL) => {
    const ext = Path.extname(filename).substring(1);

    Request(URL).pipe(
      fs
        .createWriteStream(
          `./content/assets/images/photography/${filename}.${ext}`
        )
        .on("close", () => {
          console.log(`⬇️ Finished downloading ${filename}.${ext}`);
          return guid;
        })
    );

    return guid;
  };

  const promises = [];

  data.photos.forEach(async (photo) => {
    let size = 0;
    let selectedVersion = undefined;

    Object.values(photo.derivatives).forEach((version) => {
      if (version.fileSize > size) {
        selectedVersion = version;
        size = selectedVersion.fileSize;
      }
    });

    if (selectedVersion) {
      const URL = selectedVersion.url;
      const filename = extractFilenameFromURL(URL);

      if (!uploadedItems.includes(photo.photoGuid)) {
        promises.push(downloadImage(photo.photoGuid, filename, URL));
      }
    }
  });

  const guids = await Promise.all(promises);

  uploadedItems = uploadedItems.concat(guids);

  await fs.writeFile(FILENAME, JSON.stringify(uploadedItems), (err, data) => {
    if (err) throw err;

    console.log(`Updated ${FILENAME} with newly downloaded photos`);
  });

  console.log(`🎉 Finished downloading ${promises.length} images`);
})();
