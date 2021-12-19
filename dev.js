const watch = require('node-watch');
const path = require('path')
const fs = require('fs-extra');

const loaderMap = {
    ".md": require("./loadEvoMark"),
    ".em": require("./loadEvoMark"),
    ".jpg": require("./loadResource"),
    ".png": require("./loadResource"),
    ".gif": require("./loadResource"),
    ".svg": require("./loadResource")
}
module.exports.loaderMap = loaderMap

const { compileAll, load } = require("./loader")
function runCompile(settings, isDev) {


    const template_path = path.join(__dirname, "nuxt-template")
    if (!template_dev) {
        settings.output = path.normalize(settings.src + "/" + '.evomark_ir')
        try {
            fs.copySync(template_path, settings.output, { overwrite: false })
        } catch (error) { }
    } else {
        settings.output = template_path
    }

    settings.src = path.normalize(settings.src)

    const forbiddenPath = settings.output

    let options = {
        settings: settings,
        forbiddenPath: forbiddenPath,
        loaderMap: loaderMap
    }

    let compileEnv = {}
    options.compileEnv = compileEnv

    compileAll(settings.src, options)

    if (isDev === false) {
        return
    }

    function _load(evt, name) {
        load(evt, name, options)
    }

    if (settings.watch === true)
        watch(settings.src, { recursive: true }, _load);
}
module.exports.runCompile = runCompile