const fs = require("fs");
const path = require("path");

module.exports.createOutputPath = function (filepath, basePath, outputBase, newExtName) {
    let relativePath = path.relative(basePath, filepath)
    let outputPath = path.resolve(outputBase, relativePath)
    if (newExtName) outputPath = outputPath.slice(0, outputPath.lastIndexOf(".")) + "." + newExtName
    fs.mkdirSync(outputPath.slice(0, outputPath.lastIndexOf(path.sep)), { recursive: true }, (err) => {
        if (err) throw err;
    })
    return outputPath
}

module.exports.isForbiddenPath = function (filepath) {
    let splitted = filepath.split(path.sep)
    for (let item of splitted) {
        if (item[0] == ".")
            return true
    }
    return false
}

module.exports.createNewFolder = function(folderPath){
    
    if(fs.existsSync(folderPath)){
        if(fs.lstatSync(folderPath).isDirectory()){
            fs.rmdirSync(folderPath, { recursive: true });
        }
        else{
            fs.unlinkSync(folderPath)
        }
        
    }
    fs.mkdirSync(folderPath)
}

