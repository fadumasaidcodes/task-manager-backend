const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database(':memory:');

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

function loginUser(email, password, callback) {
  const stmt = db.prepare('SELECT * FROM users WHERE email = ?');
  stmt.get(email, function(err, row) {
    if (err) {
      return callback(err);
    }

    if (!row) {
      return callback('User not found');
    }

    bcrypt.compare(password, row.password, function(err, result) {
      if (err) {
        return callback(err);
      }

      if (!result) {
        return callback('Invalid password');
      }

      callback(null, row.id);
    });
  });
}

module.exports = {
  registerUser,
  loginUser
};
