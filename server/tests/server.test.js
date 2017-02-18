const expect = require('expect');
const request = require('supertest');
const {ObjectID} = require('mongodb');

const {app} = require('../server');
const {Todo} = require('../models/todo');

const todos = [{
  _id: new ObjectID(),
  text: 'First text to do'
},{
  _id: new ObjectID(),
  text: 'Second text to do'
}];

beforeEach((done) => {
  Todo.remove({}).then(() => {
    Todo.insertMany(todos).then(() => done());
  });
});

describe('POST /todos' , () => {

  it('should create a new todo', (done) => {
    var text = 'Text todo text';

    request(app)
      .post('/todos')
      .send({ text })
      .expect(200)
      .expect((res) => {
        expect(res.body.text).toBe(text);
      })
      .end((err, res) => {
        if (err) {
          return done(err);
        }

        Todo.find({text}).then((todos) => {
          expect(todos.length).toBe(1);
          expect(todos[0].text).toBe(text);
          done();
        }).catch((e) => done(e));
      });
  });

  it('should not create todo with invalid body data', (done) => {

    request(app)
      .post('/todos')
      .send({})
      .expect(400)
      .expect((res) => {
        expect(res.body._id).toNotExist();
        expect(res.body.errors).toExist();
        expect(res.body.message).toExist();
      })
      .end((err, res) => {
        if (err) {
          return done(err);
        }

        Todo.find().then((docs) => {
          expect(docs.length).toBe(todos.length);
          done();
        }).catch((e) => done(e));
      });

  });

});

describe('GET /todos', () => {

  it('should get all todos', (done) => {

    request(app)
      .get('/todos')
      .expect(200)
      .expect((res) => {
        expect(res.body.todos.length).toBe(todos.length);
      })
      .end(done());

  });

});

describe('GET /todos/:id', () => {


  it('should get the todo by id', (done) => {

    const testId = todos[0]._id.toHexString();

    request(app)
      .get(`/todos/${testId}`)
      .expect(200)
      .expect((res) => {
        expect(res.body.todo._id).toBe(testId);
        expect(res.body.todo.text).toBe(todos[0].text);
      })
      .end(done);

  });

  it('should get return 404 when id not found', (done) => {

    const testId = new ObjectID();

    request(app)
      .get(`/todos/${testId}`)
      .expect(404)
      .expect((res) => {
        expect(res.body.message).toInclude('not found');
      })
      .end(done);

  });

  it('should get return 404 when id is invalid', (done) => {

    const testId = 'INVALIDID934865793845793874';

    request(app)
      .get(`/todos/${testId}`)
      .expect(404)
      .expect((res) => {
        expect(res.body.message).toInclude('not valid');
      })
      .end(done);

  });

});


describe('DELETE /todos/:id', ()  => {

  it('should remove the todo', (done) => {

    const hexId = todos[0]._id.toHexString();

    request(app)
      .delete(`/todos/${hexId}`)
      .expect(200)
      .expect((res) => {
        expect(res.body.todo._id).toBe(hexId);
        expect(res.body.todo.text).toBe(todos[0].text);
      })
      .end((err, res) => {
        if (err) {
          return done(err);
        }

        Todo.findById(hexId).then((todo) => {
          expect(todo).toNotExist();
          done();
        }).catch((e) => done(e));
      });

  });

  it('should get return 404 when id not found', (done) => {

    const notFoundId = new ObjectID();

    request(app)
      .delete(`/todos/${notFoundId}`)
      .expect(404)
      .expect((res) => {
        expect(res.body.message).toInclude('not found');
      })
      .end(done);

  });

  it('should get return 404 when id is invalid', (done) => {

    const invalidId = 'INVALIDID934865793845793874';

    request(app)
      .delete(`/todos/${invalidId}`)
      .expect(404)
      .expect((res) => {
        expect(res.body.message).toInclude('not valid');
      })
      .end(done);

  });

});
