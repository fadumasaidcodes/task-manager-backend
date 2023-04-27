const express = require('express');
const router = express.Router();
const { registerUser, loginUser } = require('../models/userModel');

// Register a new user
router.post('/register', async (req, res) => {
  const { name, email, password } = req.body;

  try {
    await registerUser(name, email, password);
    res.status(201).send({ message: 'User created successfully' });
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
});

// Login a user
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const userId = await loginUser(email, password);
    res.status(200).send({ message: 'User logged in successfully', userId });
  } catch (error) {
    res.status(401).send({ error: error.message });
  }
});

module.exports = router;
