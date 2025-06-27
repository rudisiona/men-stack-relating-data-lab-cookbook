const express = require('express');
const router = express.Router();

router.get('/users/:userId/foods', async (req, res) => {
  try {
    const currentUser = await User.findById(req.session.user._id);

    if (!currentUser) throw new Error('User not found');

    res.render('foods/index.ejs', { pantry: currentUser.pantry,
      userId: currentUser._id.toString()
     });
  } catch (error) {
    console.log(error);
    res.redirect('/');
  }
});

router.get('/users/:userId/foods/new', (req, res) => {
  const userId = req.params.userId
  res.render('new.ejs', { userId });
});




router.post('/users/:userId/foods', async (req, res) => {
  try {const currentUser = await User.findById(req.session.user._id);
  currentUser.pantry.push({
    foodGroup: req.body.foodGroup,
    name: req.body.name,
    readyToEat: req.body.readyToEat === 'on',
    notes: req.body.notes
  });
  await currentUser.save();
  console.log('Saved pantry:', currentUser.pantry )
  res.redirect(`/users/${currentUser._id}/foods`)

  } catch (error){
    console.log(error);
    res.redirect('/')
  }
})

router.delete('/users/:userId/foods/:foodId', async (req, res) => {
  try {const currentUser = await User.findById(req.session.user._id);
    currentUser.pantry.remove(req.params.foodId)
    await currentUser.save();
    console.log('Saved pantry:', currentUser.pantry )
    res.redirect(`/users/${currentUser._id}/foods`)
  
    } catch (error){
      console.log(error);
      res.redirect('/')
    }
})

const User = require('../models/user.js');

module.exports = router;