const mongoose = require('mongoose');

const foodSchema = new mongoose.Schema({
  foodGroup: {
    type: String,
    required: true,
    enum: ['Fruit', 'Vegetables', 'Grain', 'Protein', 'Dairy', 'Junk'
    ]
  },
  name: {
    type: String,
    required: true,
  },
  readyToEat: {
    type: Boolean,
    default: false
  },
  notes: {
    type: String,
  },

})


const userSchema = mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  pantry: [foodSchema],
});


const User = mongoose.model('User', userSchema);

module.exports = User;
