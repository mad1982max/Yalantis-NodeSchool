const multer = require('multer');
const MyErrors = require('../helpers/handleError');

const fileFilter = (req, file, cb) => {
  if (file.mimetype.split("/")[0] === 'image') {
    cb(null, true);
  } else {
    cb(new Error("Only images are allowed!"));
  }
};

const storage = multer.memoryStorage();
const upload = multer({
  storage,
  fileFilter,
  limits: {
    fileSize: 1024 * 1024 * 1024
  }
})

const fileUploadingService = (req, res, next) => {
  const uploader = upload.single("photo");
  uploader(req, res, (err) => {
    console.log(req.body)
    if (err instanceof multer.MulterError) {
      next(new MyErrors(500, 'Server error', 'error while uploading'));
      return
    } else if (err) {
      next(new MyErrors(400, 'Bad request', err.message));
      return
    }

    next()
  })
}

module.exports = fileUploadingService;