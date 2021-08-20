const sharp = require('sharp');
const uuid = require('uuid');
const constants = require('../constants');
const MyErrors = require('../helpers/handleError');

const imageClipService = (req, res, next) => {

  if (!req.file || !req.file.originalname) {
    next(new MyErrors(400, 'Bad request', 'Img is required'));
    return;
  }
  const photoId = uuid.v1();
  const fileExt = req.file.originalname.split('.')[1] || "";
  const fileName = photoId + (fileExt ? "." + fileExt : "");
  const filePath = './' + constants.photoFolder + '/' + fileName;

  sharp(req.file.buffer)
    .resize(...constants.fileDimension)
    .toFile(filePath, (err, info) => {
      if (err) {
        next(new MyErrors(500, 'Server error', 'can\'t save the file'));
        return;
      }
      console.log('--file was saved');
      req.fileName = fileName;
      next();
    })
}

module.exports = imageClipService;