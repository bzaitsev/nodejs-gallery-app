const cache = require("../cache");
const config = require("../config");
let controller = {};

controller.download = (request, response, next) => {
  let fileName = cache.images[0];
  let options = {
    root: global.rootDirName + config.uploadPath.replace('./', '/'),
    headers: {
      'Content-Disposition': `attachment; filename="${fileName}"`
    }
  };

  if (!fileName) {
    return response.status(404).send('Not found 404');
  }

  response.sendFile(fileName, options, error => {
    if (error) {
      console.error('sendFile', error);
      next(error);
    }
  });
};

module.exports = controller;