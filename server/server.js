const _ = require('lodash');
const express = require('express');
const bodyParser = require('body-parser');
const {ObjectID} = require('mongodb');

var config = require('./config/config');
var { mongoose } = require('./db/mongoose');
var { Todo } = require('./models/todo');
var { User } = require('./models/user');

var app = express();
const PORT = process.env.PORT;

app.use(bodyParser.json());

app.post('/todos', (req, res) => {
  var todo = new Todo({
    text: req.body.text
  });

  todo.save().then((doc) => {
    res.send(doc);
  }, (e) =>{
    res.status(400).send(e);
  });
});

app.get('/todos', (req, res) => {
  Todo.find().then((docs) => {
    res.send({docs});
  }, (e) => {
    res.status(400).send(e);
  });
});

app.get('/todos/:todoId', (req, res) => {
  var todoId = req.params.todoId;

  if (!ObjectID.isValid(todoId)) {
    return res.status(404).send({
      message: `Id not valid ${todoId}`
    });

  }

  // Find by Id
  Todo.findById(todoId).then((todo) => {
      if (!todo) {
        return res.status(404).send({
          message: `Id not found ${todoId}`
        });
      }
      res.send({todo});
  }, (e) => {
    res.status(400).send(e);
  });

});

app.delete('/todos/:todoId', (req, res) => {
  var todoId = req.params.todoId;

  //validate id , if is not valid return 404
  if (!ObjectID.isValid(todoId)) {
    return res.status(404).send({
      message: `Id not valid ${todoId}`
    });
  }

  //remove by id
  Todo.findOneAndRemove({_id:todoId}).then((todo) => {
    if (!todo) {
      return res.status(404).send({
        message: `Id not found ${todoId}`
      });
    }
    // success
    res.send({todo});
  }, (e) => {
    // 400 with empty body
    res.status(400).send(e);
  });
});

app.patch('/todos/:todoId', (req, res) => {
  var todoId = req.params.todoId;
  var body = _.pick(req.body, ['text', 'completed']);

  //validate id , if is not valid return 404
  if (!ObjectID.isValid(todoId)) {
    return res.status(404).send({
      message: `Id not valid ${todoId}`
    });
  }

  if (_.isBoolean(body.completed) && body.completed) {
    body.completedAt = new Date().getTime();
  } else {
    body.completed = false;
    body.completedAt = null;
  }

  Todo.findByIdAndUpdate(todoId, {$set: body}, {new: true}).then((todo) => {
    if (!todo) {
      return res.status(404).send({
        message: `Id not found ${todoId}`
      });
    }

    return res.send({todo});
  }, (e) => {
    res.status(400).send(e);
  });

});

app.post('/users', (req, res) => {
  var body = _.pick(req.body, ['email', 'password']);
  var user = new User(body);

  user.save().then(() => {
    return user.generateAuthToken();
  }).then((token) => {
    res.header('x-auth', token).send(user);
  }).catch((e) =>{
    res.status(400).send(e);
  });
});


app.listen(PORT , () => {
  console.log(`Started up at port ${PORT}`);
});

module.exports = { app };
