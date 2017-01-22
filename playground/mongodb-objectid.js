//const MongoClient = require('mongodb').MongoClient;
const {MongoClient, ObjectID} =  require('mongodb');

let obj = new ObjectID();
console.log(obj);

const MONGO_URL = 'mongodb://localhost:27017/TodoApp';
MongoClient.connect(MONGO_URL, (err, db) => {
  if (err) {
    return console.log('Unable to connect to mongodb server', err);
  }
  console.log('Connected to mongodb server');


  db.close();
});
