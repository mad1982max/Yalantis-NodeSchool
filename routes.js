const express = require('express');
const validator = require('./middleware/validator');
const controller = require('./controllers/profileController');
const logger = require('./helpers/logger.js');
const imageClipService = require('./services/imageClipService');
const fileUploadingService = require('./services/fileUploadTweaksService');

const router = express.Router();

router.use(logger);

router.get('/', (req, res) => {
  res.send({ message: 'future landing page' });
});

router.post('/register', fileUploadingService, validator.form, validator.result, imageClipService, controller.register);
router.get('/getProfileById', validator.id, validator.result, controller.getProfileById);
router.get('/getPhotoById', validator.id, validator.result, controller.getPhotoById);
router.get('/getAll', controller.getAll);

module.exports = router;




