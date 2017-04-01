/**
 * Created by Lars on 10.12.2016.
 */

var fs = require('fs');
var path = require('path');

var $APP_DATA = process.env.APPDATA || (process.platform == 'darwin' ? process.env.HOME + 'Library/Preferences' : '/var/local');

function mkdirSync (path) {
    try {
        fs.mkdirSync(path);
    } catch(e) {
        if ( e.code != 'EEXIST' ) throw e;
    }
};

mkdirSync($APP_DATA + "/single-require");
if(!fs.existsSync(path.resolve($APP_DATA + "/hex", "config.json"))){
    fs.writeFile(path.resolve($APP_DATA + "/hex", "config.json"), JSON.stringify({}, null, ' '));
}
