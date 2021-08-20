const { body, validationResult } = require('express-validator');
const MyErrors = require('../helpers/handleError');
const errorsBuilderService = require('../services/errorsBuilderService')

const validator = {
  form: [
    body('name').notEmpty().withMessage('required').isLength({ min: 3 }).withMessage('should be longer than 3 signs'),
    body('surname').notEmpty().withMessage('required').isLength({ min: 3 }).withMessage('should be longer than 3 signs'),
    body('email').notEmpty().withMessage('required').isEmail().withMessage('should be email'),
  ],

  id: [
    body('id').notEmpty().withMessage('required')
  ],

  result: (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      const errorsArrayCombined = errorsBuilderService(errors.array());
      next(new MyErrors(400, 'Bad request', JSON.stringify(errorsArrayCombined)));
      return;
    }
    next();
  }
}

module.exports = validator;