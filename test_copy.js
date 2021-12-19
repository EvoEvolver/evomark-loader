const path = require("path")
const fs = require('fs-extra'); 

const template_path = path.join(__dirname,"template")
fs.copySync(template_path,"./ir", {overwrite: false})
console.log(template_path)