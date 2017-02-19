const mongoose = require('mongoose');
const {isEmail} = require('validator');

// User model
// email (required, trimmed, minglengthed to 1),  password,
var User = mongoose.model('User', {
  email: {
    type: String,
    required: true,
    minlength: 1,
    trim : true,
    unique: true,
    validate: {
      validator: isEmail,
      message: '{VALUE} is not a valid email'
    }
  },
  password: {
    type: String,
    required: true,
    minlength: 6
  },
  tokens: [{
    access: {
      type: String,
      required: true
    },
    token: {
      type: String,
      required: true
    }
  }]
});

module.exports = {User};


// Samples
//
// create the User
/*var newUser = new User({
  name: 'juazugas',
  password: null,
  email: 'juazuri@gmail.com'
});

newUser.save().then( (doc) => {
  console.log('User saved ',doc);
}, (e) => {
  console.log('Unable to save user ', e);
});
*/
