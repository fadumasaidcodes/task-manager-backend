const { Sequelize } = require('sequelize');

// Connect to the SQLite database
const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: ':memory:',
});

// Define the User model
const User = sequelize.define('User', {
  email: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true,
    validate: {
      isEmail: true,
    },
  },
  password: {
    type: Sequelize.STRING,
    allowNull: false,
  },
});

module.exports = User;
