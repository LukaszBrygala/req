const colors = require('colors/safe');
const req = require('request');
const loadEnvironment = require('./load-environment.js');
const loadGlobals = require('./load-globals.js');
const loadRequest = require('./load-request.js');

function requestOptions(config) {
    const globals = loadGlobals(config.globals);
    const environment = loadEnvironment(config.environment);
    const request = loadRequest(config.collection, config.request, globals);

    return {
        method: request.method,
        url: `${environment.url}/${request.path}`,
        headers: Object.assign({}, environment.headers, request.headers),
        json: true,
        body: request.body
    };
}

function printHeaders(headers) {
    Object.keys(headers).forEach(header => {
        console.log(`${header}: ${headers[header]}`);
    });
}

function printRequest(options) {
    console.log();
    console.log(colors.blue.bold(`===> ${options.method.toUpperCase()} ${options.url}`));
    console.log();

    printHeaders(options.headers);

    if (options.body) {
        console.log();
        console.log(JSON.stringify(options.body, null, 2));
    }
}

function printResponse(response, body) {
    console.log();
    const color = response.statusCode === 200 ? colors.green : colors.red;
    console.log(color.bold(`<=== Status: ${response.statusCode} ${response.statusMessage}`));
    console.log();

    printHeaders(response.headers);

    console.log();
    try {
        console.log(JSON.stringify(body, null, 2));
    }
    catch (error) {
        console.error(error);
    }
}

function makeRequest(config) {
    const options = requestOptions(config);

    printRequest(options);

    req(options, function (error, response, body) {
        if (error) {
            console.error(error.message);
            process.exit(1);
        }
        printResponse(response, body);
    });
}

module.exports = makeRequest;
