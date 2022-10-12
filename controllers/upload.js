const cache = require("../cache");
let controller = {};

controller.upload = (request, response) => {
  cache.images.unshift(request.file.filename);
  response.send({
    image: request.file.path.replace('\\', '/').replace('public', '/')
  });  
};

module.exports = controller;