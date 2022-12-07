import {readdir} from "node:fs/promises";

export async function getLatestImages(cameraName) {
    const latestDirPath = `../data/images/${cameraName}/latest`;
    try {
        return (await readdir(latestDirPath))
            .filter(imgName => imgName.endsWith('.jpg'))
            .reverse();
    } catch (err) {
        console.error(err);
        return [];
    }

}