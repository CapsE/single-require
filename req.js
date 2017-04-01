/**
 * Created by Lars on 01.04.2017.
 */

const spawn = require('child_process').spawn;
var branch;
var tempBranch = new Date().getTime();
var cmd = 'git checkout -b ' + tempBranch + " HEAD~1";
cmd = "git branch | grep \* | cut -d ' ' -f2";
cmd = 'curl -O ' + url;

var url = process.argv[2];

function ex(cmd, arg){
    var sp = spawn(cmd, arg);
    return new Promise(function (resolve, reject) {
        sp.stdout.on('data', (data) => {
            console.log(data.toString());
            resolve(data.toString());
        });

        sp.stderr.on('data', (data) => {
            console.log("Error:", data.toString());
            reject(data.toString());
        });
    });
}

ex("git", ['branch'] ).then(br =>{
   br = br.split("\n")[0].substr(2);
   console.log(br);
});