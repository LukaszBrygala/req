const colors = require('colors/safe');
const fs = require('fs');
const path = require('path');
const readJson = require('./read-json.js');

function getGlobalsPath() {
    const localPath = './globals.json';
    const homePath = '~/req-globals.json';

    return fs.existsSync(path.resolve(localPath)) ? localPath : homePath;
}

function showEntry(objs, entryName, color, showKey) {
    const obj = objs[entryName];

    const keys = Object.keys(obj);
    const exampleKey = showKey ? showKey : keys[0];

    const exampleValue = keys.length > 0
        ? `${exampleKey}: "${obj[exampleKey]}"`
        : 'EMPTY';

    console.log(color.bold(entryName), exampleValue);
}

function showFile(path, color, showKey) {
    const content = readJson(path);

    console.log(color.bold(path));
    console.log();
    Object.keys(content).forEach(key => showEntry(content, key, color, showKey));
    console.log();
}

function show() {
    const globalsPath = getGlobalsPath();

    showFile(globalsPath, colors.blue);
    showFile('./environments.json', colors.red, 'url');
    showFile('./requests.json', colors.green, 'path');
}

module.exports = show;
