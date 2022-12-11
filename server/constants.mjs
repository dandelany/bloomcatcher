// import {getDirName} from "./utils/utils.mjs";
import path, {dirname} from "path";
import {fileURLToPath} from "url";

export function getDirName() {
    // alternative to __dirname
    // https://stackoverflow.com/questions/46745014/alternative-for-dirname-in-node-when-using-the-experimental-modules-flag
    return dirname(fileURLToPath(import.meta.url));
}
// path to the base /server folder
export const baseDirName = getDirName();

// export const HOSTS_FILE = `${__dirname}/../ansible/hosts.yml`;

console.log('__dirname', baseDirName);
export const DATA_DIR_PATH = path.join(baseDirName, '../data');
console.log('DATA_DIR_PATH', DATA_DIR_PATH)

// paths on the pi cameras, not local (client) paths
// export const CAM_REPO_PATH = `/home/pi/bloomcatcher`;
// export const CAM_IMG_PATH = `${CAM_REPO_PATH}/camera/cronlapse/img/`;