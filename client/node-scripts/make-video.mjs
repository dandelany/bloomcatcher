import sh from 'shelljs';
import {fileExists, dirExists, ensureDir, getDirName, getDirsIn} from './utils.mjs';
import {readdirSync} from "fs";
import {execSync} from "child_process";


const __dirname = getDirName();
const dataPath = __dirname + '/../../data';
const imagesPath = dataPath + '/images';
const videosPath = dataPath + '/videos';

(function main() {

  console.log('Data directory:', dataPath);
  console.log(getDirsIn(imagesPath));
  const camerasWithImages = getDirsIn(imagesPath);
  camerasWithImages.forEach(cameraName => {
    console.log(cameraName);
    const cameraImagesPath = `${imagesPath}/${cameraName}`;
    // const cameraVideosPath = `${videosPath}/${cameraName}/raw-60`;
    const cameraVideosPath = `${videosPath}/${cameraName}/raw`;
    console.log(cameraImagesPath);

    const camSequences = getDirsIn(cameraImagesPath);
    // console.log(camSequences);

    camSequences.forEach((sequenceName, i) => {
      console.log(`Making raw video for ${cameraName}/${sequenceName}`);

      const sequencePath = `${cameraImagesPath}/${sequenceName}`;
      const sequenceGlob = `${sequencePath}/*.jpg`;
      // path/filename of the video we're creating
      const videoOutPath = `${cameraVideosPath}/${sequenceName}.mp4`;
      ensureDir(cameraVideosPath);

      if(fileExists(videoOutPath)) {
        /*
        TODO: count frames in existing video to see if we need to make a new version or not
        console.log(videoOutPath, "already exists, counting frames");
        const frameCountCmd = `ffmpeg -i ${videoOutPath} -map 0:v:0 -c copy -f null -`;
        // const x = sh.exec(frameCountCmd).stdout;
        const x = execSync(frameCountCmd);
        console.log('ok', x.length);
        */
        console.log(videoOutPath, "already exists, skipping");
        return;
      }

      // const cmd = `ffmpeg -framerate 60 -pattern_type glob -i "${sequenceGlob}" -vf scale=1440x1080 -c:v libx264 -pix_fmt yuv420p ${videoOutPath}`;
      const cmd = `ffmpeg -pattern_type glob -i "${sequenceGlob}" -vf scale=1440x1080 -c:v libx264 -pix_fmt yuv420p ${videoOutPath}`;
      console.log(cmd);
      sh.exec(cmd);
    })

    // const contents = readdirSync(cameraImagesPath, { withFileTypes: true })
    //   .map(dirent => dirent.name);
    // console.log(contents);
  })
  // ensureDir(dataPath);
})();