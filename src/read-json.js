const fs = require('fs');
const path = require('path');

function readJson(filePath, globals = {}) {
    const resolved = path.resolve(filePath);

    try {
        const content = fs.readFileSync(resolved).toString();
        const filledInContent = replaceVariables(content, globals);
        return JSON.parse(filledInContent);
    }
    catch (error) {
        console.error(`Could not read ${resolved}.`);
        console.error(error.message);
        process.exit(1);
    }
}

function replaceVariables(stringified, globals) {
    return Object.keys(globals).reduce((filledIn, varName) => {
        const varPattern = `{{${varName}}}`;
        return filledIn.replace(new RegExp(varPattern, 'g'), globals[varName]);
    }, stringified);
}

module.exports = readJson;

