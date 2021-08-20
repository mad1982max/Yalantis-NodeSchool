const express = require('express');
const multer = require('multer');
const validator = require('./middleware/validator');
const controller = require('./controllers/profile');
const storageTweaks = require('./storage');
const MyErrors = require('./helpers/handleError');
const logger = require('./helpers/logger.js')

const storage = multer.diskStorage(storageTweaks)
const upload = multer({ storage })
const router = express.Router();

router.use(logger);

router.get('/', (req, res) => {
  res.send({ message: 'landing page' });
})
router.post('/register', upload.single("photo"), validator.form, validator.result, controller.register);
router.get('/getProfileById', validator.id, validator.result, controller.getProfileById);
router.get('/getPhotoById', validator.id, validator.result, controller.getPhotoById);
router.get('/getAll', controller.getAll);

module.exports = router;




