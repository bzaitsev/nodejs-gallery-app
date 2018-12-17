const multer  = require('multer'),  // Multer is a node.js middleware for handling multipart/form-data, which is primarily used for uploading files. Multer adds a body object and a file or files object to the request object.
      crypto = require('crypto'),
      path = require('path');

class Uploader {
  constructor(options) {
    options = options || {};

    return multer({
      storage: multer.diskStorage({
        destination: options.destination,
        filename: this.filename
      })
    });
  }

  filename(request, file, cb) {
    crypto.randomBytes(16, (error, buffer) => {
      if (error) return cb(error);
      cb(null, buffer.toString('hex') + path.extname(file.originalname));
    });
  }
}

module.exports = Uploader;