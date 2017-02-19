const {SHA256} = require('crypto-js');

var message = 'I am user number 3';

var hash = SHA256(message).toString();

console.log(`Message : ${message}`);
console.log(`Hash    : ${hash}`);

var data = {
  id: 4
};

var token = {
  data,
  hash: SHA256(JSON.stringify(data) + 'somesecret').toString()
};

var resultHash = SHA256(JSON.stringify(token.data) + 'somesecret').toString();

console.log('Data : ',JSON.stringify(data, null, 2));
console.log('Token: ',JSON.stringify(token, null, 2));

token.data.id = 5;
token.hash = SHA256(JSON.stringify(token.data)).toString();


console.log('Data2 :',JSON.stringify(data, null, 2));
console.log('Token2:',JSON.stringify(token, null, 2));

if (resultHash === token.hash) {
  console.log('Data was not changed');
} else {
  console.log('Data was changed. Do not trust!');
}
console.log('Result:',resultHash);


