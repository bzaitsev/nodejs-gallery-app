const config = require('./config');

module.exports = {
  'file-download': {
    path: '/api/download/',
    action: (request, response, next) => {
      let fileName = 'README.md';
      let options = {
        root: __dirname,
        headers: {
          'Content-Disposition': `attachment; filename="${fileName}"`
        }
      };
  
      response.sendFile(fileName, options, error => {
        if (error) {
          console.error(error);
          next(error);
        }      
      });
    }
  },
  'image-upload': {
    path: '/api/image-upload/',
    action: (request, response, next) => {
      response.send({
        image: request.file.path.replace(config.backslashStaticPath, '')
      });
    }
  } 
};