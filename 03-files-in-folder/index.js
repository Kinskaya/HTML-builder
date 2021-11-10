const path = require('path');
const fs = require('fs');

const filePath = path.dirname(__filename);
const secretFolderPath = path.join(filePath, 'secret-folder');

function getInfo(dir) {

  fs.readdir(secretFolderPath, {withFileTypes: true}, (err, files) => {
    if (err) {
      throw err;
    }
    for (let i = 0; i < files.length; i++) {
      if (files[i].isFile()) {
        fs.stat(path.join(dir, files[i].name), (err, stats) => {
          if (err) {
            console.log(err);
          }
          let arr = [];
          let name = path.parse(files[i].name).name;
          let ext = path.extname(files[i].name).slice(1);
          if (name !== '.gitkeep') {
            arr.push(`${name} - ${ext} - ${stats.size} bytes`);
          }
          arr.forEach(element => console.log(element));
        });
      }
    }
  });
}
getInfo(secretFolderPath);
