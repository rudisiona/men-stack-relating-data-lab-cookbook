const express = require('express');
const router = express.Router();


router.get('/', (req, res) => {
    res.render('foods/index.ejs');
  });

router.get('/users/:userId/foods/new', (req, res) => {
    res.render('new.ejs')
})
  
const User = require('../models/user.js');

module.exports = router;