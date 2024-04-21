
const fs = require('fs');
fs.writeFileSync('index.txt', "hello", (err) => {
    if (err) throw err;
    console.log('The file has been saved!');
  });