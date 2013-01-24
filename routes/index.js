var readdirSync = require('fs').readdirSync;
var basename = require('path').basename;

// export all javascript files in current directory
var files = readdirSync(__dirname);
for (var i = 0; i < files.length; i++) {
  if (/\.js$/.test(files[i]) && files[i] !== 'index.js') {
    files[i] = basename(files[i], '.js');
    exports[files[i]] = require('./' + files[i]);
  }
}
