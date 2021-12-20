const path = require('path');
const mb = new require('evomark-it')()
const fs = require("fs");
const { createOutputPath } = require('./helper');

module.exports = function loadEvoMark(filepath, basePath, outputBase, globalEnv) {

    outputPath = createOutputPath(filepath, basePath, path.join(outputBase, "pages"), "vue")
    let relativePath = path.relative(basePath, filepath)
    env = { basePath: basePath, outputPathPrefix: "/page_assets/" }

    var result = mb.render(fs.readFileSync(filepath, "utf-8"), env);
    var html = [
        "<template><DocumentBegin></DocumentBegin><article>",
        result,
        "</article><DocumentEnd></DocumentEnd></template>"]

    html = html.concat([
        "<script setup>\n",
        'import { provide } from "vue";\n',
        " let pageEnv=", JSON.stringify(env),
        '\nprovide("pageEnv",pageEnv);\n',
        'import katex from "katex/dist/katex.mjs";\n',
        "provide('katexAPI',katex);",
        "const reactiveEnv = useState('reactiveEnv', () => {return {}});provide('reactiveEnv',reactiveEnv);",
        "\n</script>"])

    fs.writeFile(outputPath, html.join(""), () => { })

    let pageInfo = { sectionList: env.sectionList, title: env.title }

    relativePath = relativePath.slice(0, relativePath.lastIndexOf("."))
    globalEnv.idNames[relativePath] = env.idNames
    globalEnv.pageInfo[relativePath] = pageInfo
    fs.writeFileSync(outputBase + "/public/page_assets/globalEnv.json", JSON.stringify(globalEnv), () => {})
}