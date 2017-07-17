#!/usr/bin/env node

const Program = require('commander');

Program
    .version(require('../package.json').version)
    .option('-t, --token <token>', 'github access token to make requests.')
    .parse(process.argv);

process.env.GITHUB_TOKEN = Program.token;

require('../index.js');
