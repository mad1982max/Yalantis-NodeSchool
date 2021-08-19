const constants = require('./constants');

const storageTweaks = {
  destination: function (req, file, cb) {
    cb(null, constants.photoFolder)
  },
  filename: function (req, file, cb) {
    console.log(file)
    const uniqueSuffix = Date.now();
    cb(null, file.originalname)
  }
}

module.exports = storageTweaks;