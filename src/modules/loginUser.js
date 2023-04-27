const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('db.sqlite');
const bcrypt = require('bcrypt');

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

module.exports = loginUser;
