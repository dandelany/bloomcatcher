import { readdir } from "node:fs/promises";
import * as path from "path";
import { fileURLToPath } from "url";
import express from "express";
import cors from "cors";

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

// static server for all data in the data directory
app.use("/data", express.static(DATA_DIR_PATH));

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

app.listen(port, () => {
  console.log(`Bloomcatcher server on Node ${process.version} (${process.execPath}) listening on port ${port}`);
});
