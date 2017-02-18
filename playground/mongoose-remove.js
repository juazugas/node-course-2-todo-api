const {ObjectID} = require('mongodb');
const {mongoose} = require('./../server/db/mongoose');
const {Todo}     = require('./../server/models/todo');
const {User}     = require('./../server/models/user');


// Remove everything
/*
Todo.remove({}).then((result)=>{
  console.log(result);
  // CommandResult {
  // result: { ok: 1, n: 2 },
});
  */

// find by Id and remove
Todo.findOneAndRemove('58a8131d644fe1299f32dfc3').then((doc) => {
  console.log(doc);
  // { _id: 58a8131d644fe1299f32dfc3, text: ...
});
// or by _id property
Todo.findOneAndRemove({_id:'58a8131d644fe1299f32dfc3'}).then((todo) => {
});

