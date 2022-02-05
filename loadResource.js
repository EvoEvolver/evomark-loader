const { createOutputPath } = require('./helper');
const fs = require("fs");
const path = require("path");

module.exports = function loadResource(filepath, basePath, outputBase) {
    let outputPath = createOutputPath(filepath, basePath, path.join(outputBase,"/public/page_assets"))
    fs.copyFileSync(filepath, outputPath)
}