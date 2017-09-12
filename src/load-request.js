const debug = require('debug')('req:load-request');
const readJson = require('./read-json.js');

function loadRequest(collectionPath, requestName, globals) {
    debug(globals);
    const request = readJson(collectionPath, globals)[requestName];
    if (!request) {
        console.error(`Request "${requestName}" is not specified.`);
        process.exit(1);
    }
    return request;
}

module.exports = loadRequest;
