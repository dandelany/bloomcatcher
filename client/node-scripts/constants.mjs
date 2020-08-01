import {getDirName} from "./utils.mjs";


const __dirname = getDirName();

export const HOSTS_FILE = `${__dirname}/../ansible/hosts.yml`;

export const DATA_DIR_PATH = `${__dirname}/../../data`;

// paths on the pi cameras, not local (client) paths
export const CAM_REPO_PATH = `/home/pi/bloomcatcher`;
export const CAM_IMG_PATH = `${CAM_REPO_PATH}/camera/cronlapse/img/`;