const express = require('express');
const multer = require('multer');
const validator = require('./validation');
var uuid = require('uuid');
const storageTweaks = require('./storage');

const storage = multer.diskStorage(storageTweaks)
const upload = multer({ storage })

const router = express.Router();

router.use((req, res, next) => {
  const { query, path } = req;
  console.log({ query, path });
  next();
})

router.get('/', (req, res) => {
  res.send('path: /');
})

router.post('/register', validator, upload.single("photo"), (req, res, next) => {
  const filename = req.file.filename;
  res.send({ ...req.body, photo: filename })
})

router.get('*', (req, res) => {
  res.send('path: error');
})

module.exports = router;




