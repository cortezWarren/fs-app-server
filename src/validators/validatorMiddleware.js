const { body, validationResult } = require('express-validator');

const userRegistrationValidator = () => {
  return [
    body('username')
      .notEmpty({ ignore_whitespace: false })
      .isLength({ min: 6 })
      .withMessage('Username must be required.')
      .bail(),
    body('password')
      .notEmpty({ ignore_whitespace: false })
      .isLength({ min: 6 })
      .withMessage('Password must be required.')
      .bail(),
  ]
}

const validate = (req, res, next) => {
  const errors = validationResult(req)
  if (errors.isEmpty()) {
    return next()
  }
  console.log(errors);
  
  const extractedErrors = []
  errors.array().map(err => extractedErrors.push({ [err.path]: err.msg }))

  return res.status(422).json({
    errors: extractedErrors,
  })
}

module.exports = {
  userRegistrationValidator,
  validate
}