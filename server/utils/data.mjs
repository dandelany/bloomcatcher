import { readdir } from "node:fs/promises";
import * as path from "path";

import { DATA_DIR_PATH } from "../constants.mjs";

export async function getLatestImages(cameraName) {
  const latestDirPath = path.join(DATA_DIR_PATH, `images/${cameraName}/latest`);
  try {
    return (
      (await readdir(latestDirPath))
        // return all jpgs in latest, but filter out ._foo.jpg files created by OS X
        // https://apple.stackexchange.com/questions/14980/why-are-dot-underscore-files-created-and-how-can-i-avoid-them
        .filter((imgName) => imgName.endsWith(".jpg") && !imgName.startsWith("._"))
        .reverse()
    );
  } catch (err) {
    console.error("error: no latest images", err.toString());
    return [];
  }
}
