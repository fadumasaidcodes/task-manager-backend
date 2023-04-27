const db = require('../models/db');
const bcrypt = require('bcrypt');

exports.getLogin = (req, res) => {
  res.render('login');
};

exports.postLogin = async (req, res) => {
  const { email, password } = req.body;

  // Check if email exists in database
  const user = await db.get('SELECT * FROM users WHERE email = ?', email);
  if (!user) {
    return res.render('login', { message: 'Email or password is incorrect' });
  }

  // Check if password matches
  const match = await bcrypt.compare(password, user.password);
  if (!match) {
    return res.render('login', { message: 'Email or password is incorrect' });
  }

  req.session.userId = user.id;
  res.redirect('/home');
};
