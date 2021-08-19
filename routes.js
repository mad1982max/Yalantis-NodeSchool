const express = require('express');
const multer = require('multer');
const validator = require('./middleware/validator');
const controller = require('./controllers/register');
const storageTweaks = require('./storage');

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

router.post('/register', upload.single("photo"), validator.form, validator.result, controller.register)

router.get('/getById', upload.single("photo"), validator.id, validator.result, controller.getById)

router.get('*', (req, res) => {
  res.send('path: error');
})

module.exports = router;




