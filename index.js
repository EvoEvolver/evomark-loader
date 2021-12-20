var argv = require('minimist')(process.argv.slice(2));

var settings = {
    src: "./docs_src/",
    watch: true,
    templateDev: false,
    runNuxt: true
}

Object.assign(settings, argv)

const { runCompile } = require("./dev")

runCompile(settings)