const loginUser = require('../models/loginUser');
const registerUser = require('../models/registerUser');
app.post('/api/register', function(req, res) {
    const email = req.body.email;
    const password = req.body.password;
    registerUser(email, password, (err, result) => {
      if (err) {
        res.status(500).json({ error: err });
      } else {
        res.status(200).json(result);
      }
    });
  });
  
  app.post('/api/login', function(req, res) {
    const email = req.body.email;
    const password = req.body.password;
    loginUser(email, password, (err, result) => {
      if (err) {
        res.status(500).json({ error: err });
      } else {
        res.status(200).json(result);
      }
    });
  });
  