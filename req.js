/**
 * Created by Lars on 01.04.2017.
 */

const spawn = require('child_process').spawn;
var argv = require('yargs').argv;
var branch;
var tempBranch = new Date().getTime();
var cmd = 'git checkout -b ' + tempBranch + " HEAD~1";
cmd = "git branch | grep \* | cut -d ' ' -f2";
cmd = 'curl -O ' + "url";

var url = argv._[0];
var filename = url.split("/").pop();

function ex(cmd, arg){
    var sp = spawn(cmd, arg);
    return new Promise(function (resolve, reject) {
        sp.stdout.on('data', (data) => {
            resolve(data.toString());
        });

        sp.stderr.on('data', (data) => {
            resolve(data.toString());
        });
    });
}

function getBranch(){
    return new Promise(function(resolve, reject){
        ex("git", ['branch'] ).then(br =>{
            br = br.split("*")[1].split("\n")[0].substr(1);
            resolve(br);
        }).catch(e =>{
            reject(e);
        });
    });
}


getBranch().then(br =>{
    branch = br;
    return ex("git", ["checkout", "-b" , tempBranch, "HEAD~1"]);
}).then(function () {
    return ex("curl", ["-O", url]);
}).then(function () {
    return ex("git", ["add", filename]);
}).then(function () {
    return ex("git", ["commit", "-m" , "Require update"]);
}).then(function () {
    return ex("git", ["checkout", branch]);
}).then(function () {
    return ex("git", ["merge", tempBranch]);
}).then(function () {
    return ex("git", ["branch", "-D", tempBranch]);
});