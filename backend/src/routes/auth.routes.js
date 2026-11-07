const express = require('express');
const { signup, login } = require('../controllers/auth.controller');
const { validate } = require('../middlewares/validate.middleware');
const { signupSchema, loginSchema } = require('../validations/auth.validation');

const router = express.Router();

router.post('/signup', validate(signupSchema), signup);
router.post('/login', validate(loginSchema), login);

module.exports = router;
