import { readdir } from "node:fs/promises";
import * as path from "path";

import { DATA_DIR_PATH } from "../constants.mjs";

export async function getLatestImages(cameraName) {
  const latestDirPath = path.join(DATA_DIR_PATH, `images/${cameraName}/latest`);
  try {
    return (await readdir(latestDirPath)).filter((imgName) => imgName.endsWith(".jpg")).reverse();
  } catch (err) {
    console.error("error: no latest images", err.toString());
    return [];
  }
}
