const express = require('express');
const app = express();
const PORT = 3000;
// const userRouter = require('./router/userRouter');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const cookieSession = require('cookie-session');
const itemRouter = require('./router/itemRouter.js');
const itemController = require('./controller/itemController.js');
const userController = require('./controller/userController.js');
const emailController = require('./controller/emailController.js');
const sessionController = require('./controller/sessionController.js');

const path = require('path');
//install path

//set up cors policy
var corsOptions = {
  origin: 'http://localhost:8080',
};
app.use(cors(corsOptions));

const mongoose = require('mongoose');
require('dotenv').config();

app.use(express.json());
app.use(cookieParser());
mongoose.connect(process.env.DATABASE_CONNECTION_KEY); //must create a new .env file somehow link to this, will give us mongoDB access
mongoose.connection.once('open', () => {
  console.log('Connected to Database');
});

app.use('/item', itemRouter);
//both endpoints below are now pushed into itemRouter^^

// app.use('/create-item', itemRouter)
// app.use('/all-listings', itemController.getAllItems, (req, res) => {
//     res.status(200).json(res.locals.allListings)
// })

const staticPath = path.join(__dirname, '../build/index.html');
console.log('build html ', staticPath);
// const staticPath2 = path.join(__dirname, '../index.html');
// console.log('home html', staticPath2);
// app.get('/createpost', express.static(path.join(__dirname, '../build/index.html')));
app.use('/createpost', sessionController.verifySSID, (req, res) => {
  res.status(200).sendFile(staticPath);
});
app.use('/listings', sessionController.verifySSID, (req, res) => {
  res.status(200).sendFile(staticPath);
});

// get request to signup to get signup page
app.get('/signup', (req, res) => {
  res.status(200).sendFile(staticPath);
});

app.get('/auth', sessionController.verifySSID, (req, res) => {
  res.status(200).json(true);
});

// post request to signup to create the user
// The body will have {username, password}
app.post(
  '/signup',
  userController.createUser,
  sessionController.setSSID,
  (req, res, next) => {
    res.status(200).sendFile(staticPath);
    return next();
  },
  emailController.sendWelcomeEmail
);

app.post(
  '/login',
  userController.verifyUser,
  sessionController.setSSID,
  (req, res) => {
    console.log('Successful login');
    res.redirect('/item');
  }
);

app.use('/build', express.static(path.join(__dirname, '../build')));
// app.use('/login', userRouter);

// app.use('/signup', userRouter);

//endpoints for handling user login or user signup
app.use('/', (req, res) => {
  res.status(200).sendFile(path.join(__dirname, '../index.html'));
});

app.use('*', (req, res) => {
  res.status(404).send('File Not Found');
});

app.use((err, req, res, next) => {
  const defaultErr = {
    log: 'Express error handler caught unknown middleware error',
    status: 500,
    message: { err: 'there is an error and its your fault' },
  };
  const errorObj = Object.assign(defaultErr, err);
  res.status(errorObj.status).json(errorObj.message);
});

app.listen(3000, () => {
  console.log(`server listening on port ${PORT}`);
});
