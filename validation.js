const { body, validationResult } = require('express-validator');

const validator = (req, res, next) => {
  console.log('-inside mw-', req.body)
  next()
}

module.exports = validator;