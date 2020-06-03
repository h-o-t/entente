#!/usr/bin/env node

require("ts-node").register({ project: "./tsconfig.json", files: true });

module.exports = require("./tests");
