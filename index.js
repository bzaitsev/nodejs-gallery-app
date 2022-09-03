const fs = require('fs');
const cors = require('cors');
const express = require('express'); 
const app = express();
const http = require('http').Server(app);
const config = require('./config');
const cache = require('./cache');
const routes = require('./routes');
const Uploader = require('./uploader');

const uploader = new Uploader({
  destination: config.uploadPath
});

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

app
  .set('view engine', 'ejs')
  .use(express.static(config.staticPath))
  .use(cors())
  .get('/', routes.home)
  .get('/api/download/', routes.download)
  .post('/api/image-upload/', uploader.single('file'), routes.upload)

http.listen(config.port, error => { 
  if (error) return console.error('Server start: ', error);   
  console.log(`Server is listening on port ${config.port}`);
});