import { readdir } from "node:fs/promises";
import * as path from "path";
import { fileURLToPath } from "url";
import express from "express";
import cors from "cors";
import serveIndex from "serve-index";
import sharp from "sharp";

import { DATA_DIR_PATH } from "./constants.mjs";
import { getLatestImages } from "./utils/data.mjs";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = 3939;

// enable cross-origin requests from the web-client dev server
const corsOptions = { origin: "http://localhost:3940" };
app.use(cors(corsOptions));

// serve built web client with static server
const webClientBuildPath = path.join(__dirname, "../web-client/build");
app.use("/", express.static(webClientBuildPath));

app.use(
  "/data",
  // static server for all data in the data directory
  express.static(DATA_DIR_PATH),
  // serve index pages for directories in data dir
  serveIndex(DATA_DIR_PATH, { icons: true })
);

// get the list of cameras & their metadata
// todo replace this with shared config file
const cameras = [
  { name: "claude", hostname: "claude.local" },
  { name: "georgia", hostname: "georgia.local" },
];
app.get("/api/cameras", async (req, res) => {
  const camerasInfo = await Promise.all(
    cameras.map(async (camera) => {
      const latestImages = await getLatestImages(camera.name);
      return { ...camera, latestCount: latestImages.length };
    })
  );
  res.json(camerasInfo);
});

app.get("/api/latest", async (req, res) => {
  try {
    // names of folders in /data/images are the names of the cameras
    const imagesDirPath = path.join(DATA_DIR_PATH, "images");
    const dirObjs = await readdir(imagesDirPath, { withFileTypes: true });
    const cameraNames = dirObjs.filter((obj) => obj.isDirectory()).map((obj) => obj.name);

    const cameraData = await Promise.all(
      cameraNames.map(async (name) => {
        return { name, latestImages: await getLatestImages(name) };
      })
    );
    res.json(cameraData);
  } catch (err) {
    console.error(err);
    res.status(500).send(JSON.stringify(error));
  }
});

app.get("/thumbs/:width/*", (req, res, next) => {
  // creates a thumbnail of a larger image using sharp
  // :width url parameter defines width of thumbnail
  // * is the path to an image in /data/images

  const partialImgPath = req.params[0];
  const imgPath = path.join(DATA_DIR_PATH, "images", partialImgPath);
  const size = parseInt(req.params["width"], 10);

  sharp(imgPath)
    .resize({ width: size })
    .toBuffer()
    .then((data) => {
      res.contentType("image/jpeg");
      res.send(data);
    })
    .catch((e) => next(e));
});

app.listen(port, () => {
  console.log(`Bloomcatcher server on Node ${process.version} (${process.execPath}) listening on port ${port}`);
});
