//const MongoClient = require('mongodb').MongoClient;
const {MongoClient, ObjectID} =  require('mongodb');

const MONGO_URL = 'mongodb://localhost:27017/TodoApp';
MongoClient.connect(MONGO_URL, (err, db) => {
  if (err) {
    return console.log('Unable to connect to mongodb server', err);
  }
  console.log('Connected to mongodb server');

  db.collection('Todos').findOneAndUpdate({
    _id : ObjectID('588486376542f677214e7faf')
  }, {
    $set :{
      completed: true
    }
  }, {
    returnOriginal: false
  }).then((result) => {
      console.log(result);
    });

  //db.close();
});
