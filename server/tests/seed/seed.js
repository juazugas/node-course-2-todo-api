const {ObjectID} = require('mongodb');
const jwt = require('jsonwebtoken');

const {Todo} = require('../../models/todo');
const {User} = require('../../models/user');

const userOneId = new ObjectID();
const userTwoId = new ObjectID();

const users = [{
  _id : userOneId,
  email : 'user.one@example.com',
  password : 'userOnePass',
  tokens: [{
    access: 'auth',
    token: jwt.sign({_id: userOneId, access: 'auth'}, 'abc123').toString()
  }]
}, {
  _id : userTwoId,
  email : 'user.two@example.com',
  password : 'userTwoPass'
}];

const todos = [{
  _id: new ObjectID(),
  text: 'First text to do',
  _creator: userOneId
},{
  _id: new ObjectID(),
  text: 'Second text to do',
  completed: true,
  completedAt: 333,
  _creator: userTwoId
}];

const populateUsers = (done) => {
  User.remove({}).then(() => {
    var userOne = new User(users[0]).save();
    var userTwo = new User(users[1]).save();

    return Promise.all([userOne, userTwo]);
  }).then(() => done()).catch((e) => done(e));
};

const populateTodos = (done) => {
  Todo.remove({}).then(() => {
    Todo.insertMany(todos).then(() => done());
  });
};


module.exports = { todos, users, populateTodos, populateUsers };
