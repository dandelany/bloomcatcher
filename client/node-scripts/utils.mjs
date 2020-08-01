import { dirname } from 'path';
import { fileURLToPath } from 'url';
import { readdirSync } from 'fs';

import sh from 'shelljs';

export function getDirName() {
  // alternative to __dirname
  // https://stackoverflow.com/questions/46745014/alternative-for-dirname-in-node-when-using-the-experimental-modules-flag
  return dirname(fileURLToPath(import.meta.url));
}

export function fileExists(path) { return sh.test('-f', path); }

export function dirExists(path) { return sh.test('-d', path); }
export function ensureDir(path) {
  if(!dirExists(path)) sh.mkdir('-p', path);
}



export function getDirsIn(path) {
  return readdirSync(path, { withFileTypes: true })
    .filter(dirent => dirent.isDirectory())
    .map(dirent => dirent.name);
}

