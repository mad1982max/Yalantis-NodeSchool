const express = require('express');
const validator = require('./middleware/validator');
const controller = require('./controllers/profile');
const logger = require('./helpers/logger.js');
const imageClipService = require('./services/imageClip');
const fileUploadingService = require('./services/fileUploadTweaks')

const router = express.Router();

router.use(logger);

router.get('/', (req, res) => {
  res.send({ message: 'landing page' });
})
router.post('/register', fileUploadingService, imageClipService, validator.form, validator.result, controller.register);
router.get('/getProfileById', validator.id, validator.result, controller.getProfileById);
router.get('/getPhotoById', validator.id, validator.result, controller.getPhotoById);
router.get('/getAll', controller.getAll);

module.exports = router;




