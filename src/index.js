const debug = require('debug')('req:index');
const config = require('./config.js');
const makeRequest = require('./make-request.js');
const show = require('./show.js');

debug(config);

switch (config.command) {
    case "mk":
        return makeRequest(config);
    case "show":
        return show();
    default:
        console.error(`Unknown command ${config.command}.`);
        process.exit(1);
}
