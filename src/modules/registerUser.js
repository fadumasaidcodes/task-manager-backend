const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('db.sqlite');
const bcrypt = require('bcrypt');
const validator = require('validator');

const SALT_ROUNDS = 10;

function registerUser(name, email, password, callback) {
  if (!validator.isEmail(email)) {
    return callback('Invalid email address');
  }

  if (!validator.isLength(password, { min: 8 })) {
    return callback('Password must be at least 8 characters long');
  }

  bcrypt.hash(password, SALT_ROUNDS, function(err, hash) {
    if (err) {
      return callback(err);
    }

    const stmt = db.prepare('INSERT INTO users (name, email, password) VALUES (?, ?, ?)');
    stmt.run(name, email, hash, function(err) {
      if (err) {
        return callback(err);
      }

      callback(null);
    });
  });
}

module.exports = registerUser;
