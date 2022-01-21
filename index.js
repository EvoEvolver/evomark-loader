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


    let template_path = require.resolve("evomarked-nuxt")//path.join(__dirname, "nuxt-template")
    template_path = template_path.slice(0,template_path.lastIndexOf(path.sep))
    
    if (!settings.templateDev) {
        const banned_paths = [".git","pages","public/page_assets",".nuxt"]
        settings.output = path.normalize(settings.src + "/" + '.evomark_ir')
        try {
            fs.copySync(template_path, settings.output, {
                overwrite: true, filter: (src, dest) => {
                    let relative_path = path.relative(template_path, src)
                    if (banned_paths.indexOf(relative_path) >= 0)
                        return false
                    else
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

    var nuxt_dev_server = child_process.spawn("npm", ['exec',"nuxi", "dev", settings.output], { encoding: 'utf-8', shell: true });
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