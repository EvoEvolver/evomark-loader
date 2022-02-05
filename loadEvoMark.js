const path = require('path');
const evomark = new require('evomark-it')()
const fs = require("fs");
const { createOutputPath } = require('./helper');
const toml = require('toml');

module.exports = function loadEvoMark(filepath, basePath, outputBase, globalEnv) {

    outputPath = createOutputPath(filepath, basePath, path.join(outputBase, "pages"), "vue")

    let relativePath = path.relative(basePath, filepath)
    let env = prepareEnv(basePath,relativePath)
    let result
    try {
        result = evomark.render(fs.readFileSync(filepath, "utf-8"), env);
    } catch (error) {
        result = "<pre><code>" + error.message + "\n" + error.stack + "</code></pre>"
    }

    let html = 
`<template>
<div>
<DocumentBegin></DocumentBegin>
<article>
${result}
<DocumentEnd></DocumentEnd>
</article>
</div>
</template>
<script setup>
import { provide } from "vue"
let pageEnv= ${JSON.stringify(env)}
provide("pageEnv",pageEnv);
</script>
`


    fs.writeFileSync(outputPath, html, () => { })

    let pageInfo = { sectionList: env.sectionList, title: env.title }

    relativePath = relativePath.slice(0, relativePath.lastIndexOf("."))
    globalEnv.idNames[relativePath] = env.idNames
    globalEnv.pageInfo[relativePath] = pageInfo
    fs.writeFileSync(outputBase + "/public/page_assets/globalEnv.json", JSON.stringify(globalEnv), () => { })
}

function prepareEnv(basePath, relativePath) {
    let env = { basePath: basePath, outputPathPrefix: path.join("/page_assets/",path.dirname(relativePath)) }
    let project_env
    try{
        let raw = fs.readFileSync(path.join(basePath, "project_env.toml"), 'utf-8')
        project_env = toml.parse(raw)
    }catch(error){}
    if(project_env)
        Object.assign(env,project_env)
    return env
}