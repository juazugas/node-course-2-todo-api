var express = require('express');
var bodyParser = require('body-parser');
var {ObjectID} = require('mongodb');

var { mongoose } = require('./db/mongoose');
var { Todo } = require('./models/todo');
var { User } = require('./models/user');

var app = express();
const PORT = process.env.PORT || 3000;

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

app.listen(PORT , () => {
  console.log(`Started on  port ${PORT}`);
});

module.exports = { app };
