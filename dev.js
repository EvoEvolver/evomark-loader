const watch = require('node-watch');
const path = require('path')
const fs = require('fs-extra');
const { createNewFolder } = require("./helper")
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
function runCompile(settings) {


    const template_path = path.join(__dirname, "nuxt-template")
    if (!settings.templateDev) {

        settings.output = path.normalize(settings.src + "/" + '.evomark_ir')
        try {
            fs.copySync(template_path, settings.output, {
                overwrite: true, filter: (src, dest) => {
                    let relative_path = path.relative(template_path, src)
                    if (relative_path == "pages")
                        return false
                    if (relative_path == "public/page_assets")
                        return false
                    return true;
                }
            })
        } catch (error) {
            console.log(error);
        }
    } else {

        settings.output = template_path

        console.log("templateDev mode running", settings.output)
    }

    settings.src = path.normalize(settings.src)

    const forbiddenPath = settings.output

    createNewFolder(settings.output + "/public/page_assets")
    createNewFolder(settings.output + "/pages")

    let options = {
        settings: settings,
        forbiddenPath: forbiddenPath,
        loaderMap: loaderMap
    }

    let globalEnv = {
        idNames:{},
        pageInfo:{}
    }

    options.globalEnv = globalEnv
    //loadProjectConfigs(settings,compileEnv)
    compileAll(settings.src, options)


    if (settings.watch === false || settings.watch === "false") {
        return
    }

    function _load(evt, name) {
        load(evt, name, options)
    }

    if (settings.watch === true || settings.watch === "true" )
        watch(settings.src, { recursive: true }, _load);

    if (settings.runNuxt === true || settings.runNuxt === "true") {
        runNuxtDev(settings)
    }

}
module.exports.runCompile = runCompile
var child_process = require('child_process');
function runNuxtDev(settings) {

    var nuxt_dev_server = child_process.spawn("npx", ["nuxi", "dev", settings.output], { encoding: 'utf-8' });
    console.log("Working on " + settings.output)
    nuxt_dev_server.stdout.on('data', function (chunk) {
        console.log("[Nuxt] " + chunk.toString());
    });
    nuxt_dev_server.stderr.on('data', (data) => {
        console.log("[Nuxt] " + data);
    });

}

const toml = require('toml');

function loadProjectConfigs(settings, compileEnv) {
    let compile_config
    try {
        compile_config = toml.parse(fs.readFileSync(settings.src+"/.compile.toml"))
    } catch (error) {
        console.log(error)
    }
    console.log(compile_config)
}