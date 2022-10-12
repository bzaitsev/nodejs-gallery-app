const router = require('express').Router();
const controller = require('../controllers/download');

router.get('/', controller.download);

module.exports = router;
