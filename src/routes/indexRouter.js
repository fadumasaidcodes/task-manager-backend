const express = require('express');
const router = express.Router();
const loginRouter = require('./loginRouter');
const registrationRouter = require('./registrationRouter');

router.use('/login', loginRouter);
router.use('/register', registrationRouter);

module.exports = router;
