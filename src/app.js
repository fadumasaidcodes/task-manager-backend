const express = require('express');
const app = express();

// Load environment variables
require('dotenv').config();

// Connect to the database
require('./db/mongoose');

// Parse incoming JSON requests
app.use(express.json());

// Define routes
const userRouter = require('./routers/user');
const taskRouter = require('./routers/task');
app.use(userRouter);
app.use(taskRouter);

// Start the server
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is up on port ${port}`);
});
