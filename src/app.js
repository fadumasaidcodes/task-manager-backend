const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

// Import routes
const indexRouter = require('./routes/indexRouter');
const loginRouter = require('./routes/loginRouter');
const registrationRouter = require('./routes/registrationRouter');

const app = express();

// Set up view engine
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// Set up middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

// Set up routes
app.use('/', indexRouter);
app.use('/login', loginRouter);
app.use('/registration', registrationRouter);

// Start server
app.listen(3000, () => {
  console.log('Server listening on port 3000');
});
