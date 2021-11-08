const path = require('path');
const fs = require('fs');

const filePath = path.dirname(__filename);
const stylesPath = path.join(filePath, 'styles');
const distPath = path.join(filePath, 'project-dist');

const writeStream = fs.createWriteStream(path.join(distPath, 'bundle.css'));

fs.readdir(stylesPath, {withFileTypes: true}, (err, files) => {
  if (err) {
    console.log(err);
  }
  for (let i = 0; i < files.length; i++) {
    if (files[i].isFile()) {
      let ext = path.extname(files[i].name).slice(1);
      if (ext === 'css') {
        fs.readFile(path.join(stylesPath, files[i].name), function(err, data) {
          if (err) {
            console.log(err);
          }
          let array = data.toString().split('\n');
          array.forEach(value => writeStream.write(`${value}\n`));
        });
      }
    }
  }
});
