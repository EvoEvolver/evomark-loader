const path = require('path');
const mb = new require('evomark-it')()
const fs = require("fs");
const { createOutputPath } = require('./helper');

module.exports = function loadEvoMark(filepath, basePath, outputBase, compileEnv) {

    outputPath = createOutputPath(filepath, basePath, path.join(outputBase, "pages"), "vue")
    let relativePath = path.relative(basePath, filepath)
    env = { basePath: basePath, outputPathPrefix: "/page_assets/" }

    var result = mb.render(fs.readFileSync(filepath, "utf-8"), env);
    var html = [
        "<template><div>", 
        result, 
        "</div></template>"]

    html = html.concat([
        "<script setup>\n", 
        'import { provide } from "vue";\n', 
        " let pageEnv=", JSON.stringify(env), 
        '\nprovide("pageEnv",pageEnv);\n', 
        'import katex from "katex/dist/katex.mjs";\n',
        "provide('katexAPI',katex);", 
        "const reactiveEnv = useState('reactiveEnv', () => {return {}});provide('reactiveEnv',reactiveEnv);",
        "\n</script>"])

    fs.writeFile(outputPath, html.join(""),()=>{})
    relativePath = relativePath.slice(0,relativePath.lastIndexOf("."))
    compileEnv[relativePath] = {
        idNames: env.idNames,
        outerLinks: env.outerLinks
    }
    fs.writeFileSync(outputBase+"/public/compileEnv.json",JSON.stringify(compileEnv),()=>{})
}