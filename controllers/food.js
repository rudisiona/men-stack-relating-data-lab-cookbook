const express = require('express');
const router = express.Router();


router.get('/', (req, res) => {
    res.render('foods/index.ejs');
  });
  
const User = require('../models/user.js');

module.exports = router;