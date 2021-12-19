var argv = require('minimist')(process.argv.slice(2));
var settings = {
    src: "./docs_src/",
    watch: true,
    template_dev: false
}
Object.assign(settings, argv)

const { runCompile } = require("./dev")

runCompile(settings)