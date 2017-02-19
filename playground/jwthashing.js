const {SHA256} = require('crypto-js');
const jwt = require('jsonwebtoken');

var data = {
  id: 10
};


// signs the data and generates a JWT token
var token = jwt.sign(data, '123abc');
console.log(token);

// verifies the passed token
var decoded = jwt.verify(token, '123abc');
console.log(decoded);
