var mongoose = require('mongoose');
var {isEmail} = require('validator');

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/TodoApp');

module.exports = { mongoose };
