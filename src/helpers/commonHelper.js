const Fs = require('fs');

const readFromFile = (file) =>
  new Promise((resolve, reject) => {
    console.log(file);
    Fs.readFile(file, (err, content) => {
      if (err) {
        return reject(err);
      }

      return resolve(JSON.parse(content));
    });
  });

module.exports = {
  readFromFile,
};
