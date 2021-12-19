const dirTree = require("directory-tree");
const path = require("path")
const fs = require('fs-extra'); 

let  project_path = "./test_project/"

let src_tree = dirTree(project_path,{ exclude: /\/\.evomark_ir/ });
console.log(src_tree)
let ir_tree = dirTree(project_path+"/.evomark_ir");
console.log(ir_tree)

const folders_to_copy = ["layouts","components","assets","nuxt.config.js"]
for(let folder of folders_to_copy){
    var source = path.join(__dirname,"../evomarked-nuxt/"+folder);
    var destination = project_path+"/.evomark_ir/"+folder;
    if(fs.existsSync(destination)){
        console.log(destination+" exists.")
        continue
    }
    // Copy the source folder to the destination
    fs.copy(source, destination, function (err) {
        if (err){
            console.log('An error occurred while copying the folder.')
            return console.error(err)
        }
        console.log('Copy completed!')
    });
}
