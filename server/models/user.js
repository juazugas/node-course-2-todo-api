const jwt = require('jsonwebtoken');
const _ = require('lodash');
const mongoose = require('mongoose');
const {isEmail} = require('validator');

// User schema
var UserSchema = new mongoose.Schema({
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

UserSchema.methods.toJSON = function() {
  var user = this;
  var userObj = user.toObject();
  return _.pick(userObj, ['email', '_id']);
};

// User methods
UserSchema.methods.generateAuthToken = function() {
  var user = this;
  var access = 'auth';
  var token = jwt.sign({_id: user._id.toHexString(), access}, 'abc123').toString();
  user.tokens.push({ access, token });

  return user.save().then(() => {
    return token;
  });
};

// User model
var User = mongoose.model('User', UserSchema);

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
