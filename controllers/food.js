const express = require('express');
const router = express.Router();

router.get('/users/:userId/foods', (req, res) => {
  const userId = req.params.userId;
  res.render('foods/index.ejs', { userId });
});

router.get('/users/:userId/foods/new', (req, res) => {
  res.render('new.ejs');
});

const User = require('../models/user.js');

module.exports = router;