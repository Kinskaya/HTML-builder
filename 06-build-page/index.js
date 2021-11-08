const path = require('path');
const fs = require('fs');

const filePath = path.dirname(__filename);

fs.mkdir(path.join(filePath, 'project-dist'),  { recursive: true },  err => {
  if (err) {
    console.log(err);
  }
});

const projectDist = path.join(filePath, 'project-dist');

const articles = path.join(filePath, 'components', 'articles.html');
const footer = path.join(filePath, 'components', 'footer.html');
const header = path.join(filePath, 'components', 'header.html');
const writeStream = fs.createWriteStream(path.join(projectDist, 'index.html'));

fs.readFile(path.join(filePath, 'template.html'), (err, data) => {
  if (err) throw err;
  let template = data.toString();

  fs.readFile(header, (err, data) => {
    template = template.replace('{{header}}', data.toString());
    fs.readFile(articles, (err, data) => {
      template = template.replace('{{articles}}', data.toString());
      fs.readFile(footer, (err, data) => {
        template = template.replace('{{footer}}', data.toString());
        let array = template.toString().split('\n');
        array.forEach(value => writeStream.write(value));
      });
    });
  });
});


const stylesPath = path.join(filePath, 'styles');
const writeStreamCss = fs.createWriteStream(path.join(projectDist, 'style.css'));

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
          array.forEach(value => writeStreamCss.write(`${value}\n`));
        });
      }
    }
  }
});


const assetsPath = path.join(filePath, 'assets');
fs.mkdir(path.join(projectDist, 'assets'),  { recursive: true },  err => {
  if (err) {
    console.log(err);
  }
});

const assetsDist = path.join(projectDist, 'assets');

fs.readdir(assetsPath, {withFileTypes: true},((err, files) => {
  let current;
  for (let i = 0; i < files.length; i++) {
    if (files[i].isDirectory()) {
      current = files[i].name;

      fs.mkdir(path.join(assetsDist, current), { recursive: true }, err => {
        if (err) {
          console.log(err);
        }

        fs.readdir(path.join(assetsPath, current), (err, files) => {
          if (err) {
            console.log(err);
          }
          for (let i = 0; i < files.length; i += 1) {
            fs.copyFile(`${path.join(assetsPath, current)}/${files[i]}`, `${path.join(assetsDist, current)}/${files[i]}`, err => {
              if (err) {
                console.log(err);
              }
            });
          }
        });
      });
    }
  }
}));
