const cache = require("./cache");
let routes = {};

routes.home = (request, response) => {
  response.render('index', {images: cache.images});
};

routes.download = (request, response, next) => {
  let fileName = 'README.md';
  let options = {
    root: __dirname,
    headers: {
      'Content-Disposition': `attachment; filename="${fileName}"`
    }
  };

  response.sendFile(fileName, options, error => {
    if (error) {
      console.error('sendFile', error);
      next(error);
    }
  });
};

routes.imageUpload = (request, response) => {
  cache.images.unshift(request.file.filename);
  response.send({
    image: request.file.path.replace('\\', '/').replace('public', '/')
  });
};

module.exports = routes;