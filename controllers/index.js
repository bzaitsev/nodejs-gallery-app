const cache = require("../cache");
let controller = {};

controller.read = (request, response) => {
  response.render('index', {images: cache.images});
};

module.exports = controller;