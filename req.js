/**
 * Created by Lars on 01.04.2017.
 */

var $APP_DATA = process.env.APPDATA || (process.platform == 'darwin' ? process.env.HOME + 'Library/Preferences' : '/var/local');

try{
    var ENV = require($APP_DATA + "/single-require/config.json");
}catch (e){
    console.log(e);
}

const spawn = require('child_process').spawn;
const path = require('path'), fs=require('fs');
const argv = require('yargs').argv;

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
                }, 100);
            }
        });
    });
}

function fromDir(startPath,filter){

    //console.log('Starting from dir '+startPath+'/');

    if (!fs.existsSync(startPath)){
        console.log("no dir ",startPath);
        return;
    }

    var files=fs.readdirSync(startPath);
    for(var i=0;i<files.length;i++){
        var filename=path.join(startPath,files[i]);
        var stat = fs.lstatSync(filename);
        var fileSplit = filename.split(".");

        if (stat.isDirectory()){
            fromDir(filename,filter); //recurse
        }
        else if (fileSplit.length > 2 && fileSplit[fileSplit.length-1] == filter) {
            console.log('-- found: ',filename);
            fn = filename;
            fs.readFile("./" + filename, function (err,content) {
                console.log('loading: ',content.toString());
                if(content.indexOf("https://gitlab.com/") != -1){
                    fn = fn.split(".");
                    fn.pop();
                    fn = fn.join(".");
                    ex("curl", ["-o", fn, content, "--header", "PRIVATE-TOKEN: " + ENV.gitlabToken]);
                }else{
                    fn = fn.split(".");
                    fn.pop();
                    fn = fn.join(".");
                    ex("curl", ["-o", fn, content]);
                }

            });
        };
    };
};

fromDir('./','req');
