import express from 'express';
import serveIndex from "serve-index";
import {getDirName} from "../../client/node-scripts/utils.mjs";

const app = express();

const __dirname = getDirName();

// Serve URLs like /ftp/thing as public/ftp/thing
// The express.static serves the file contents
// The serveIndex is this module serving the directory
const dataDir = `${__dirname}/../..`;
// const dataDir = `${__dirname}/../../data`;

app.use(
  '/static',
  // serve file contents
  express.static(dataDir),
  // serve directory index pages
  serveIndex(dataDir, {'icons': true})
);

// Listen
app.listen(80);