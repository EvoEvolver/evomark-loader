#!/usr/bin/env node

var argv = require('minimist')(process.argv.slice(3));

var settings = {
    src: process.argv[2] || "./docs_src/",
    watch: true,
    templateDev: false,
    runNuxt: true
}

Object.assign(settings, argv)

const { runCompile } = require("..")

runCompile(settings)