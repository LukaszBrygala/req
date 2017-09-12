const fs = require('fs');
const path = require('path');
const readJson = require('./read-json.js');

function loadGlobals(name) {
    const localPath = './globals.json';
    const homePath = '~/req-globals.json';

    const filePath = fs.existsSync(path.resolve(localPath)) ? localPath : homePath;

    const globals = readJson(filePath);

    if (name) {
        if (!globals[name]) {
            console.error(`Globals setup "${name}" is not specified.`);
            process.exit(1);
        }

        return globals[name];
    }

    return {};
}

module.exports = loadGlobals;
