var mongoose = require('mongoose');

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
  },
  _creator: {
    type: mongoose.Schema.Types.ObjectId,
    required: true
  }
});

module.exports = { Todo };

// Samples
//
// create a new Todo
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
