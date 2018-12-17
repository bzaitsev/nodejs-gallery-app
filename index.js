const config = require('./config'),
      express = require('express'), 
      webServer = express(),
      http = require('http').Server(webServer),
      io = require('socket.io')(http),
      routes = require('./routes'),
      Uploader = require('./uploader');

const imageUploader = new Uploader({
  destination: config.uploadImagesPath
});

webServer
  .use(express.static(config.staticPath))
  .post(routes['image-upload']['path'], imageUploader.single('file'), routes['image-upload']['action'])
  .get(routes['file-download']['path'], routes['file-download']['action']);

http.listen(config.port, error => { 
  if (error) return console.error('Server start error: ', error);   
  console.log(`Server is listening on port ${config.port}`);
});