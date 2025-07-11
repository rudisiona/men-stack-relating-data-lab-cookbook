const dotenv = require('dotenv');
dotenv.config();
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const methodOverride = require('method-override');
const morgan = require('morgan');
const session = require('express-session');
const isSignedIn = require('./middleware/is-signed-in.js')
const passUserToView = require('./middleware/pass-user-to-view.js')

const authController = require('./controllers/auth.js');
const foodController = require('./controllers/food.js');
const usersController = require('./controllers/users.js')
const port = process.env.PORT ? process.env.PORT : '3000';

mongoose.connect(process.env.MONGODB_URI);

mongoose.connection.on('connected', () => {
  console.log(`Connected to MongoDB ${mongoose.connection.name}.`);
});
app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: false }));
app.use(methodOverride('_method'));
// app.use(morgan('dev'));
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
  })
);

app.get('/', (req, res) => {
  res.render('index.ejs', {
    user: req.session.user,
  });
});
// app.get('/test', (req, res) => {
//   res.render('foods/index.ejs', { userId: 'test123'})
// })
app.get('/vip-lounge', (req, res) => {
  if (req.session.user) {
    res.send(`Welcome to the party ${req.session.user.username}.`);
  } else {
    res.send('Sorry, no guests allowed.');
  }
});



app.use(passUserToView)
app.use('/auth', authController);
app.use(isSignedIn)
app.use('/', foodController)
app.use('/', usersController);

app.listen(port, () => {
  console.log(`The express app is ready on port ${port}!`);
});
