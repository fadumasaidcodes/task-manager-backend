const { loginUser } = require('../modules/loginUser');

function login(req, res) {
  const { email, password } = req.body;

  loginUser(email, password, (err, userId) => {
    if (err) {
      return res.status(400).send({ error: err });
    }

    req.session.userId = userId;
    res.status(200).send({ message: 'User logged in successfully' });
  });
}

module.exports = {
  login,
};
