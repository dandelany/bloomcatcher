import * as path from "path";
// use callback/sync fs module
import * as fs from 'node:fs';
import { DATA_DIR_PATH } from "./constants.mjs";

// Module which keeps track of various metadata about
// the images/video stored by Phototempo
// For simplicity, this metadata is all stored in a single JSON file,
// called phototempo-metadata.json & kept in the `data` directory

const META_FILE_NAME = 'phototempo-metadata.json';
const META_FILE_PATH = path.join(DATA_DIR_PATH, META_FILE_NAME);

export const metaStore = {
  init() {
    this.ensureMetaFileExists();
  },
  // create metadata file if it doesn't exist
  ensureMetaFileExists() {
    try {
      fs.writeFileSync(META_FILE_PATH, '{}', {flag: 'wx'});
      console.log(`created metadata file: ${META_FILE_PATH}`);
    } catch(e) {
      console.log(`metadata file exists already`);
    }
    
  }
};