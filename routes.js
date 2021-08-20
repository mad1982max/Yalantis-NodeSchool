const express = require('express');
const multer = require('multer');
const validator = require('./middleware/validator');
const controller = require('./controllers/profile');
const storageTweaks = require('./storage');
const MyErrors = require('./helpers/handleError')

const storage = multer.diskStorage(storageTweaks)
const upload = multer({ storage })

const router = express.Router();

router.use((req, res, next) => {
  console.log('some log:', { path: req.path, date: new Date() });
  next();
})

router.get('/', (req, res) => {
  res.send('path: /');
})

router.post('/register', upload.single("photo"), validator.form, validator.result, controller.register);
router.get('/getProfileById', validator.id, validator.result, controller.getProfileById);
router.get('/getPhotoById', validator.id, validator.result, controller.getPhotoById);
router.get('/getAll', controller.getAll);

module.exports = router;




