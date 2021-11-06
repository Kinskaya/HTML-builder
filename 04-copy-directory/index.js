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

        if (files[i].isDirectory() !== copy) {
          fs.mkdir(path.join(filePath, copy), { recursive: true }, err => {
            if (err) {
              console.log(err);
            }

            fs.readdir(path.join(filePath, current), (err, files) => {
              if (err) {
                console.log(err);
              }
              for (let i = 0; i < files.length; i += 1) {
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
