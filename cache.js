const fs = require('node:fs');
const config = require('./config');

let cache = {
  images: []
};

fs.readdir(config.uploadPath, (err, files) => {
  if (err) return console.error('readdir:', err);

  files
    .map(fileName => ({
      name: fileName,
      time: fs.statSync(config.uploadPath + fileName).mtime.getTime()
    }))
    .sort((a, b) => b.time - a.time)
    .forEach(file => cache.images.push(file.name));
});

module.exports = cache;