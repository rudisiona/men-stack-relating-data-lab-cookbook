const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const User = require('../models/user.js');

router.get('/users', async (req, res) => { 
    try {
        const allUsers = await User.find(); 
        res.render('users/index.ejs', { users: allUsers  })
    } catch (error) {
        console.log(error)
        res.redirect('/)')
    }
})
router.get('/users/:id', async (req, res) => {
        const reqUser = await User.findById(req.params.id)
        res.render('users/show.ejs', { user: reqUser })
        })
module.exports = router;
