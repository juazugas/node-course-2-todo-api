var mongoose = require('mongoose');
var {isEmail} = require('validator');

mongoose.Promise = global.Promise;
mongoose.connect(process.env.MONGODB_URI);

module.exports = { mongoose };
