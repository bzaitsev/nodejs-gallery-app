const fs = require('fs');
const cors = require('cors');
const express = require('express'); 
const app = express();
const http = require('http').Server(app);
const config = require('./config');
const cache = require('./cache');
const routes = require('./routes');
const Uploader = require('./uploader');

const imageUploader = new Uploader({
  destination: config.uploadImagesPath
});

fs.readdir(config.uploadImagesPath, (err, files) => {
  if (err) return console.error('readdir:', err);
  files.forEach(file => cache.images.push(file));
});

app
  .set('view engine', 'ejs')
  .use(express.static(config.staticPath))
  .use(cors())
  .get('/', routes.home)
  .get('/api/download/', routes.download)
  .post('/api/image-upload/', imageUploader.single('file'), routes.imageUpload)

http.listen(config.port, error => { 
  if (error) return console.error('Server start: ', error);   
  console.log(`Server is listening on port ${config.port}`);
});