const express = require('express');
const router = express.Router();
const registrationController = require('../controllers/registrationController');

router.get('/', registrationController.getRegistration);
router.post('/', registrationController.postRegistration);

module.exports = router;
