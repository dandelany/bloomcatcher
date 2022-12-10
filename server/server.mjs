import {readdir} from "node:fs/promises";
import express from 'express';
import cors from 'cors';
// const express = require('express');
// const cors = require('cors');



import {getLatestImages} from './utils/data.mjs';

const app = express();
const port = 3939;

// enable cross-origin requests from the web-client
const corsOptions = { origin: 'http://localhost:3940' };
app.use(cors(corsOptions));

app.use('/', express.static('../web-client/build'));

// static server for all data in ../data
app.use('/data', express.static('../data'));

// get the list of cameras & their metadata
// todo replace this with shared config file
const cameras = [
    {name: 'claude', hostname: 'claude.local'},
    {name: 'georgia', hostname: 'georgia.local'}
]
app.get('/api/cameras', async (req, res) => {
    const camerasInfo = await Promise.all(
        cameras.map(async camera => {
            const latestImages = await getLatestImages(camera.name);
            return {...camera, latestCount: latestImages.length};
        })
    );
    res.json(camerasInfo);
});


app.get('/api/latest', async (req, res) => {
    try {
        // names of folders in /data/images are the names of the cameras
        const dirObjs = (await readdir('../data/images', {withFileTypes: true}));
        const cameraNames = dirObjs.filter(obj => obj.isDirectory()).map(obj => obj.name);

        const cameraData = await Promise.all(
            cameraNames.map(async (name) => {
                return {name, latestImages: await getLatestImages(name)};
            })
        );
        res.json( cameraData );

    } catch (err) {
        console.error(err);
        res.status(500).send(JSON.stringify(error));
    }
});

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});

