/**
 * Created by Lars on 01.04.2017.
 */

const spawn = require('child_process').spawn;
var argv = require('yargs').argv;
var branch;
var tempBranch = new Date().getTime();


var url = argv._[0];
var filename = url.split("/").pop();

function ex(cmd, arg){
    var sp = spawn(cmd, arg);
    var buffer = "";
    return new Promise(function (resolve, reject) {
        sp.stdout.on('data', (data) => {
            buffer += data.toString() + "\n";
        });

        sp.stderr.on('data', (data) => {
            buffer += data.toString() + "\n";
        });

        sp.on('close', (code) => {
            if(cmd != "curl"){
                resolve(buffer);
            }else{
                setTimeout(function () {
                    resolve(buffer);
                }, 500);
            }
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
}).then(function (o) {
    console.log(o);
    return ex("curl", ["-O", url]);
}).then(function (o) {
    console.log(o);
    return ex("git", ["add", filename]);
}).then(function (o) {
    console.log(o);
    return ex("git", ["commit", "-m" , "Require update"]);
}).then(function (o) {
    console.log(o);
    return ex("git", ["checkout", branch]);
}).then(function (o) {
    console.log(o);
    return ex("git", ["merge", tempBranch]);
}).then(function (o) {
    console.log(o);
    return ex("git", ["branch", "-D", tempBranch]);
});