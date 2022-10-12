const router = require('express').Router();
const controller = require('../controllers/upload');
const config = require('../config');
const Uploader = require('../libs/uploader');

const uploader = new Uploader({
  destination: config.uploadPath
});

router.post('/', uploader.single('file'), controller.upload);

module.exports = router;
