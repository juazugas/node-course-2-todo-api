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

/*
  // All documents
  db.collection('Todos').find().toArray().then((documents) => {
    console.log('Todos');
    console.log(JSON.stringify(documents, undefined, 2));
  }, (err) => {
    console.log('Unable to fetch documents', err);
  });

  // By field _completed_
  db.collection('Todos').find({completed: false}).toArray().then((documents) => {
    console.log('Todos');
    console.log(JSON.stringify(documents, undefined, 2));
  }, (err) => {
    console.log('Unable to fetch documents', err);
  });

  // By ObjectId
  db.collection('Todos').find({
      _id: new ObjectID('58847eb74b264483b6c37436')
    }).toArray().then((documents) => {
    console.log('Todos');
    console.log(JSON.stringify(documents, undefined, 2));
  }, (err) => {
    console.log('Unable to fetch documents', err);
  });

  db.collection('Todos').find().count().then((count) => {
    console.log('Todos ', count);
  }, (err) => {
    console.log('Unable to fetch documents', err);
  });

*/

  db.collection('Users').find({name: 'Juan Zuriaga'}).toArray().then((docs) => {
    console.log('Users');
    console.log(JSON.stringify(docs, undefined, 2));
  }, (err) => {
    console.log('Unable to fetch documents', err);
  });

  //db.close();
});
