const { registerUser } = require('../modules/registerUser');

function register(req, res) {
  const { email, password } = req.body;

  registerUser(email, password, (err) => {
    if (err) {
      return res.status(400).send({ error: err });
    }

    res.status(201).send({ message: 'User registered successfully' });
  });
}

module.exports = {
  register,
};

