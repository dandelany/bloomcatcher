import { readdirSync } from "node:fs";
import { readdir } from "node:fs/promises";
import * as path from "path";

import { DATA_DIR_PATH } from "../constants.mjs";

export async function getDirsIn(dirPath) {
  const items = await readdir(dirPath, { withFileTypes: true });
  const dirs = items.filter((item) => item.isDirectory()).map((item) => item.name);
  return dirs;
}

export async function getJpgsIn(dirPath) {
  // return the filenames of all JPG files in directory specified by dirPath
  try {
    return (
      (await readdir(dirPath))
        .filter((name) => name && name.endsWith(".jpg") && !name.startsWith("._"))
        .reverse()
    )
  } catch (err) {
    return [];
  }
  
}

export function getJpgsInSync(dirPath) {
  // return the filenames of all JPG files in directory specified by dirPath
  try {
    return (
      readdirSync(dirPath)
        .filter((name) => name && name.endsWith(".jpg") && !name.startsWith("._"))
        .reverse()
    )
  } catch (err) {
    return [];
  }
  
}

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
