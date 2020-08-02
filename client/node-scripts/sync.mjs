import YAML from "yaml";
import fs from 'fs'
import sh from 'shelljs';

import NodeSSH from 'node-ssh';
const ssh = new NodeSSH();


import {getDirName} from "./utils.mjs";
import {CAM_IMG_PATH, DATA_DIR_PATH, HOSTS_FILE} from "./constants.mjs";

const __dirname = getDirName();
// const HOSTS_FILE = `${__dirname}/../ansible/hosts.yml`;

// read the ansible hosts.yml file and parse it to a JS object
// easy way to use a "single source of truth" shared between ansible and node scripts
function getFieldCameraHosts() {
  const file = fs.readFileSync(HOSTS_FILE, 'utf8');
  const parsedHosts = YAML.parse(file);
  const fieldCameras = parsedHosts?.all?.children?.field_cameras?.hosts;
  return fieldCameras;
}


function getLatestImagesDirPath(cameraName) {
  return `${DATA_DIR_PATH}/images/${cameraName}/latest`;
}

function getSyncCommandFor(host, cameraName) {
  const imagesDirPath = getLatestImagesDirPath(cameraName);
  const user = host.ansible_user || "pi";
  const address = host.ansible_host;
  if(!address || !imagesDirPath) return;

  const cmd = `rsync -av --progress --remove-source-files ${user}@${address}:${CAM_IMG_PATH} ${imagesDirPath}`;
  return cmd;
}

async function trySSHConnect(host) {
  return await ssh.connect({
    host: host.ansible_host,
    username: host.ansible_user,
    privateKey: `/Users/delany/.ssh/id_rsa`
  });
}

async function sync(){
  const cameras = getFieldCameraHosts();
  for(const key of Object.keys(cameras)) {
    const host = cameras[key];
    let ok = false;

    try {
      await trySSHConnect(host);
      ok = true;
      console.log(`Successfully connected to ${key}`);
      ssh.dispose();
    } catch(e) {
      console.error(`Could not connect to ${key}`);
      console.error(e);
    }
    if(!ok) return;

    const syncCommand = getSyncCommandFor(host, key);
    console.log(syncCommand);
    sh.exec(syncCommand);
  }
}

// sync();

async function main() {
  let done = false;
  await sync();
  done = true;

  setInterval(async () => {
    console.log('trying to sync');
    if(!done) return;
    done = false;
    await sync();
    done = true;
  }, 1000 * 60 * 5);
}

main();

// let done = true;
//
// console.log('setting interval');
//
// setInterval(async () => {
//   if(!done) return;
//   done = false;
//   await sync();
//   done = true;
// }, 1000 * 60 * 10);