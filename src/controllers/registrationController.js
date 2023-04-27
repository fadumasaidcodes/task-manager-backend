const db = require('../models/db');
const bcrypt = require('bcrypt');

exports.getRegistration = (req, res) => {
	res.render('registration');
};

exports.postRegistration = async (req, res) => {
	const { email, password } = req.body;

	// Check if email already exists in database
	const existingUser = await db.get('SELECT * FROM users WHERE email = ?', email);
	if (existingUser) {
		return res.render('registration', { message: 'Email already in use' });
	}

	// Hash password
	const salt = await bcrypt.genSalt(10);
	const hashedPassword = await bcrypt.hash(password, salt);

	// Insert new user into database
	const result = await db.run('INSERT INTO users (email, password) VALUES (?, ?)', email, hashedPassword);

	req.session.userId = result.lastID;
	res.redirect('/login');
};
