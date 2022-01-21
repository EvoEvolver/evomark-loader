const iterateFiles = require('node-dir').files;
const { isForbiddenPath } = require("./helper")
const path = require('path')

module.exports.compileAll = function (src, options) {
    iterateFiles(src, function (err, files) {
        if (err) throw err;
        files.forEach(function (filepath) {
            if (isForbiddenPath(filepath)) {
                //console.log("not to process ",filepath)
                return
            } else {
                load("init", filepath, options)
            }
        })
    });
}

function load(evt, name, options) {
    if (evt == 'remove') {
        return
    }
    if (isForbiddenPath(name)) {
        //console.log("not to process ",name)
        return
    }

    let nameEnd = name.length;
    let filename = name.slice(name.lastIndexOf(path.sep), nameEnd)
    let extName = name.slice(name.lastIndexOf("."), nameEnd)
    if (filename.slice(0, 2) === "__") return
    let fileLoader = options.loaderMap[extName]
    if (!fileLoader) return
    fileLoader(name, options.settings.src, options.settings.output, options.globalEnv)
    console.log(name + " processed")
    //console.log(options.compileEnv)
}
module.exports.load = load