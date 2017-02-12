const {ObjectID} = require('mongodb');
const {mongoose} = require('./../server/db/mongoose');
const {Todo}     = require('./../server/models/todo');
const {User}     = require('./../server/models/user');

/*
var id = '58a02ea6cbb29615697fbcd1';

// Find by filter
Todo.find({ _id: id }).then((docs) => {
    console.log('Todos:', docs);
  }, (e) => {
    console.log('Unable to fetch Todos ',e);
  });

// Find one by filter
Todo.findOne({ _id: id }).then((doc) => {
    console.log('Todo: ', doc);
  }, (e) => {
    console.log('Unable to fetch Todos ',e);
  });

// Find by Id
Todo.findById(id).then((doc) => {
    console.log('TodoById: ', doc);
  }, (e) => {
    console.log('Unable to fetch Todos ',e);
  });

var fakeId = '68a02ea6cbb29615697fbcd1';

// Find by filter
Todo.find({ _id: fakeId }).then((docs) => {
    console.log('TodosFake:', docs);
  }, (e) => {
    console.log('Unable to fetch Todos ',e);
  });

// Find one by filter
Todo.findOne({ _id: fakeId }).then((doc) => {
    console.log('TodoFake: ', doc);
  }, (e) => {
    console.log('Unable to fetch Todos ',e);
  });

// Find by Id
Todo.findById(fakeId).then((doc) => {
    if (!doc) {
      return console.log('Id not found ',fakeId);
    }
    console.log('TodoByIdFake: ', doc);
  }, (e) => {
    console.log('Unable to fetch Todos ',e);
  });

var badId = '58a02ea6cbb29615697fbcd1111';

if (!ObjectID.isValid(badId)) {
  console.log('Id not valid ', badId);
}

// Find by Id
Todo.findById(badId).then((doc) => {
    if (!doc) {
      return console.log('Id not found ',badId);
    }
    console.log('TodoByIdFake: ', doc);
  })
  .catch((e) => console.log(e));

*/

// Challenge
// Correct
var userId = '5897673f63479c5909968567';
// Fake
//var userId = '6897673f63479c5909968567';
// Bad
//var userId = '5897673f63479c590996856711';

if (!ObjectID.isValid(userId)) {
  return console.log('Id is NOT valid',userId);
}

User.findById(userId).then((user) => {
  if (!user) {
    return console.log('User not found ',userId);
  }

  console.log('UserById: ', JSON.stringify(user, undefined, 2));

}).catch((e) => console.log(e));
