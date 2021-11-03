const path = require('path');
const mb = new require('../evomark-it/index')()
const fs = require("fs");
const { createOutputPath } = require('./helper');

module.exports = function loadEvoMark(filepath, basePath, outputBase) {

    outputPath = createOutputPath(filepath, basePath, path.join(outputBase,"pages"), "vue")

    env = { basePath: basePath, outputPathPrefix: "/page_assets/" }
    
    var result = mb.render(fs.readFileSync(filepath, "utf-8"), env);
    var html = ["<template><div>", result, "</div></template>"]
    html = html.concat(["<script setup>\n", 'import { provide } from "vue";\n', " let pageEnv=", JSON.stringify(env), '\nprovide("pageEnv",pageEnv);\n','import initPage from "~/initPage"\n',
    "initPage(pageEnv,provide)","\n</script>"])

    fs.writeFileSync(outputPath, html.join(""))
}