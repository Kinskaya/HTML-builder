const readline = require('readline');
const { stdin: input, stdout: output } = require('process');
const fs = require('fs');
const path = require('path');

const rl = readline.createInterface({ input, output });
const filePath = path.join(__dirname, 'text.txt');

let writeableStream = fs.createWriteStream(filePath);

rl.question('Please write your message: ', (answer) => {

  if (answer === 'exit') {
    rl.close();
  } else {
    writeableStream.write(`${answer}\n`);
    rl.on('line', (line) => {
      if (line === 'exit') {
        rl.close();
      } else {
        writeableStream.write(`${line}\n`);
      }
    });
  }
});

rl.on('pause', () => {
  console.log('Thank you for your feedback.');
});
