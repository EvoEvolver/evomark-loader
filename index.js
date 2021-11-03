const watch = require('node-watch');
const path = require('path')
var argv = require('minimist')(process.argv.slice(2));

var settings = {
    src: "./docs_src/",
}

Object.assign(settings, argv)

const tempFolderName = '.evomark_ir'
//settings.output = path.normalize(settings.src + "/" + tempFolderName)
settings.output = path.normalize(path.resolve(__dirname,"../evomarked-nuxt/"))
const {createNewFolder} = require('./helper')
createNewFolder(settings.output+"/pages")
createNewFolder(settings.output+"/page_assets")

settings.src = path.normalize(settings.src)

const forbiddenPath = path.normalize(settings.src + "/.evomark_ir")

loaderMap = {
    ".md": require("./loadEvoMark"),
    ".jpg": require("./loadResource"),
    ".png": require("./loadResource"),
    ".gif": require("./loadResource"),
    ".svg": require("./loadResource")
}


function load(evt, name) {
    if (evt == 'remove') {
        return
    }
    //console.log(name,forbiddenPath)
    if (name.startsWith(forbiddenPath)) {
        //console.log("not to process ",name)
        return
    }

    let nameEnd = name.length;
    let filename = name.slice(name.lastIndexOf("/"), nameEnd)
    let extName = name.slice(name.lastIndexOf("."), nameEnd)
    if (filename.slice(0, 2) === "__") return
    let fileLoader = loaderMap[extName]
    if (!fileLoader) return
    fileLoader(name, settings.src, settings.output)
    console.log(name + " processed")
}

const iterateFiles = require('node-dir').files;

function compileAll(src) {
    iterateFiles(src, function (err, files) {
        if (err) throw err;
        files.forEach(function (filepath) {
            if (filepath.startsWith(forbiddenPath)) {
                //console.log("not to process ",filepath)
                return
            } else {
                load("init", filepath)
            }
        })
    });
}

compileAll(settings.src)
watch(settings.src, { recursive: true }, load);
