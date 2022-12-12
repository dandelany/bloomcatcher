// import {getDirName} from "./utils/utils.mjs";
import path, { dirname } from "path";
import { fileURLToPath } from "url";

export function getDirName() {
  // alternative to __dirname
  // https://stackoverflow.com/questions/46745014/alternative-for-dirname-in-node-when-using-the-experimental-modules-flag
  return dirname(fileURLToPath(import.meta.url));
}

const __dirname = getDirName();
// path to the base /server folder
export const baseDirName = __dirname;

// export const HOSTS_FILE = `${__dirname}/../ansible/hosts.yml`;

export const DATA_DIR_PATH = path.join(baseDirName, "../data");

// paths on the pi cameras, not local (client) paths
// export const CAM_REPO_PATH = `/home/pi/bloomcatcher`;
// export const CAM_IMG_PATH = `${CAM_REPO_PATH}/camera/cronlapse/img/`;
