const path = require('path');
const fs = require('fs');

function copyDir() {
  const filePath = path.dirname(__filename);
  let current, copy;

  fs.readdir(filePath, {withFileTypes: true},((err, files) => {
    for (let i = 0; i < files.length; i++) {
      if (files[i].isDirectory()) {
        current = files[i].name;
        copy = `${files[i].name}-copy`;

        fs.readdir(path.join(filePath, copy), (err, files) => {
          if (err && err.code === 'ENOENT') {
            return;
          } else {
            for (let file of files) {
              if (files) {
                fs.unlink(path.join(path.join(filePath, copy), file), err => {
                  if (err) {
                    console.log(err);
                  }
                });
              }
            }
          }
        });

        if (files[i].isDirectory() !== copy) {
          fs.mkdir(path.join(filePath, copy), { recursive: true }, err => {
            if (err) {
              console.log(err);
            }

            fs.readdir(path.join(filePath, current), (err, files) => {
              if (err) {
                console.log(err);
              }
              for (let i = 0; i < files.length; i++) {
                fs.copyFile(`${path.join(filePath, current)}/${files[i]}`, `${path.join(filePath, copy)}/${files[i]}`, err => {
                  if (err) {
                    console.log(err);
                  }
                });
              }
            });
          });
        }
        return;
      }
    }
  }));
}
copyDir();
