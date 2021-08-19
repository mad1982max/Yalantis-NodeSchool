const { body, validationResult } = require('express-validator');
const MyErrors = require('../helpers/handleError')

const validator = {
  form: [
    body('name').notEmpty().withMessage('required').isLength({ min: 3 }).withMessage('should be longer than 3 signs'),
    body('surname').notEmpty().withMessage('required').isLength({ min: 3 }).withMessage('should be longer than 3 signs'),
    body('email').notEmpty().withMessage('required').isEmail().withMessage('should be email')
  ],

  id: [
    body('id').notEmpty().withMessage('required')
  ],

  result: (req, res, next) => {
    const errors = validationResult(req);
    errors.isEmpty() ?
      next() :
      next(new MyErrors(400, 'Bad request', JSON.stringify(errors.array())))
  }
}

module.exports = validator;