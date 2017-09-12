const readJson = require('./read-json.js');

function loadEnvironment(name) {
    const environments = readJson('./environments.json');
    const environmentNames = Object.keys(environments);

    if (environmentNames.length === 0) {
        console.error(`Empty environments configuration.`);
        process.exit(1);
    }

    if (!name) {
        console.error('Environment is required.');
        process.exit(1);
    }

    if (!environments[name]) {
        console.error(`Environment "${name}" is not specified.`);
        process.exit(1);
    }

    return environments[name];
}

module.exports = loadEnvironment;
