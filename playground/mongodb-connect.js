const MongoClient = require('mongodb').MongoClient;


const url = 'mongodb://localhost:27017/TodoApp';

MongoClient.connect(url, (err, db) => {
  if (err) {
    return console.log('Unable to connect to mongodb server', err);
  }
  console.log('Connected to mongodb server');

  db.collection('Todos').insertOne({
    text: 'something to do',
    completed: false
  }, (err, result) => {
    if (err) {
      return console.log('Unable to insert record in mongodb', err);
    }
    console.log(JSON.stringify(result.ops, undefined, 2));
  });

  // Exercise
  // Insert new document into Users (name, age, location)
  db.collection('Users').insertOne({
    name: 'Juan Zuriaga',
    age: 41,
    location: 'Valencia, Spain'
  }, (err, result) => {
    if (err) {
      return console.log('Unable to insert record in mongodb', err);
    }
    console.log(JSON.stringify(result.ops, undefined, 2));
  });

  db.close();
});
