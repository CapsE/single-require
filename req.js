/**
 * Created by Lars on 01.04.2017.
 */

var exec = require('child_process').exec;
var tempBranch = new Date().getTime();
var cmd = 'git checkout -b ' + tempBranch + " HEAD~1";

exec(cmd, function(error, stdout, stderr) {
    console.log(stdout);
});
