#!/usr/bin/env node

const spawn = require('child_process').spawn;
function runCommand(cmd, args, cwd, onEnd) {
    console.log(cmd, args)
    var cmd_runner = spawn(cmd, args, { encoding: 'utf-8', cwd: cwd});
    cmd_runner.stdout.on('data', function (chunk) {
        console.log(chunk.toString());
    });
    cmd_runner.stderr.on('data', (data) => {
        console.log(data.toString());
    });
    cmd_runner.on('close', (data) => {
        console.log("process closed");
        onEnd()
    });
}

var argv = require('minimist')(process.argv.slice(2));

var settings = {
    src: "./docs_src/",
}

Object.assign(settings, argv)

console.log("building")
runCommand("yarn",["em-dev","--src",settings.src,"--watch","false"],process.cwd(),()=>{
    runCommand("yarn",["install"],settings.src+"/.evomark_ir",()=>{
        runCommand("yarn",["nuxi","build",settings.src+"/.evomark_ir"],process.cwd(),()=>{})
    })
})
