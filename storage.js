const constants = require('./constants');
const uuid = require('uuid');

const storageTweaks = {
  destination: function (req, file, cb) {
    cb(null, constants.photoFolder)
  },
  filename: function (req, file, cb) {
    const photoId = uuid.v1();
    const fileExt = file.originalname.split('.')[1] || ""
    const fileName = photoId + (fileExt ? "." + fileExt : "");
    req.fileName = fileName;
    cb(null, fileName)
  }
}

module.exports = storageTweaks;