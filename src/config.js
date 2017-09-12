const yargs = require('yargs');

const config = yargs
    .locale('en')
    .command('show', 'Show specified environments, globals sets and requests.')
    .command('mk <request>', 'Make HTTP Request.', {
        collection: {
            alias: 'c',
            type: 'string',
            describe: 'The requests collection.',
            default: './requests.json'
        },
        environment: {
            alias: 'e',
            type: 'string',
            describe: 'The environment. Defaults to env REQ_ENV.',
            default: process.env.REQ_ENV
        },
        globals: {
            alias: 'g',
            type: 'string',
            describe: 'The globals. Defaults to env REQ_GLOBALS.',
            default: process.env.REQ_GLOBALS
        }
    })
    // .command('new <project-name>', 'Initialize new project directory.')
    .demandCommand(1, 'Specify command to execute.')
    .help('h', 'Show help.')
    .argv;

config.command = config._[0];

module.exports = config;
