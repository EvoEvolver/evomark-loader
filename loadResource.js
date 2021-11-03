const { createOutputPath } = require('./helper');
const fs = require("fs");

module.exports = function loadResource(filepath, basePath, outputBase) {
    let outputPath = createOutputPath(filepath, basePath, outputBase+"/page_assets")
    fs.copyFileSync(filepath, outputPath)
}