const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const path = require('path');

// Importing controllers
const loginUser = require('./controllers/loginUser');
const registerUser = require('./controllers/registerUser');
const homeController = require('./controllers/homeController');

const app = express();

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());

// Setting view engine and views path
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Serving static files
app.use(express.static(path.join(__dirname, 'public')));

// Routes
app.get('/', homeController.index);
app.get('/login', loginUser.login);
app.get('/register', registerUser.register);

app.post('/api/register', registerUser.register);
app.post('/api/login', loginUser.login);

// Start server
app.listen(3000, () => console.log('Server started on port 3000'));

module.exports = app;
