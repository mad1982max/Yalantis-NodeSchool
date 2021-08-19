const { body, validationResult } = require('express-validator');

const validator = {
  form: [
    body('name').not().isEmpty().withMessage('required').isLength({ min: 3 }).withMessage('should be longer than 3 signs'),
    body('surname').not().isEmpty().withMessage('required').isLength({ min: 3 }).withMessage('should be longer than 3 signs'),
    body('email').not().isEmpty().withMessage('required').isEmail().withMessage('should be email')
  ],

  result: (req, res, next) => {
    const errors = validationResult(req);
    errors.isEmpty() ?
      next() :
      res.status(400).json({ errors: errors.array() })
  }

}

module.exports = validator;