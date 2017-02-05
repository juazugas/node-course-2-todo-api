var mongoose = require('mongoose');
var {isEmail} = require('validator');

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/TodoApp');

// create the model
var Todo = mongoose.model('Todo', {
  text: {
    type: String,
    required: true,
    minlength: 1,
    trim: true
  },
  completed: {
    type: Boolean,
    default: false
  },
  completedAt: {
    type: Number,
    //default: null
  }
});

// create a brand new Tdov
/*var emptyTodo = new Todo({
  text : undefined
});

emptyTodo.save().then( (doc) => {
  console.log('Saved todo', doc);
}, (e) => {
  console.log('Unable to save todo', e);
});*/

/*var anotherTodo = new Todo({
  text: 'Another todo',
  completed: false,
  completedAt: new Date().getTime()
});

anotherTodo.save().then( (doc) => {
  console.log('Saved todo', doc);
}, (e) => {
  console.log('Unable to save todo', e);
});*/

// User model
// email (required, trimmed, minglengthed to 1),  password,
var User = mongoose.model('User', {
  email: {
    type: String,
    required: true,
    minlength: 1,
    trim : true,
    validate: [ isEmail, 'invalid email' ]
  },
  password: {
    type: String
  }
});

var newUser = new User({
  name: 'juazugas',
  password: null,
  email: 'juazuri@gmail.com'
});

newUser.save().then( (doc) => {
  console.log('User saved ',doc);
}, (e) => {
  console.log('Unable to save user ', e);
});

