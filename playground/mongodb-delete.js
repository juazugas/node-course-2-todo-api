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

  // deleteMany
    /*
  db.collection('Todos').deleteMany({ text: 'Eat lunch'}).then((result)=>{
    console.log(result);
  });
   */

  // deleteOne
  /*db.collection('Todos').deleteOne({ text: 'Eat lunch'}).then((result) => {
    console.log(result);
  });*/

  // findOneAndDelete
  /*db.collection('Todos').findOneAndDelete({ completed: false }).then((result) => {
    console.log(result);
  });*/

  // deleteMany from Users where name = Juan Zuriaga
  db.collection('Users').deleteMany({ name: 'Juan Zuriaga' }).then((result)=> {
    console.log(result);
  });

  // delete one from Users where objectId = ObjectId("588489cb6542f677214e7fb2")
  db.collection('Users').findOneAndDelete({ _id : ObjectID('588489cb6542f677214e7fb2')})
    .then((result) => {
      console.log(result);
    });

  //db.close();
});
