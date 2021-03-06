const expect = require('expect');
const request = require('supertest');
const {ObjectID} = require('mongodb');
const bcrypt = require('bcryptjs');

const { todos, users, populateTodos, populateUsers } = require('./seed/seed');
const {app} = require('../server');
const {Todo} = require('../models/todo');
const {User} = require('../models/user');

beforeEach(populateUsers);
beforeEach(populateTodos);

describe('POST /todos' , () => {

  it('should create a new todo', (done) => {
    let text = 'Text todo text';

    request(app)
      .post('/todos')
      .set('x-auth', users[0].tokens[0].token)
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
      .set('x-auth', users[0].tokens[0].token)
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
      .set('x-auth', users[0].tokens[0].token)
      .expect(200)
      .expect((res) => {
        expect(res.body.todos.length).toBe(1);
      })
      .end(done);

  });

});

describe('GET /todos/:id', () => {

  it('should get the todo by id', (done) => {

    let testId = todos[0]._id.toHexString();

    request(app)
      .get(`/todos/${testId}`)
      .set('x-auth', users[0].tokens[0].token)
      .expect(200)
      .expect((res) => {
        expect(res.body.todo._id).toBe(testId);
        expect(res.body.todo.text).toBe(todos[0].text);
      })
      .end(done);

  });

  it('should not get the todo by id created by other user', (done) => {

    let testId = todos[1]._id.toHexString();

    request(app)
      .get(`/todos/${testId}`)
      .set('x-auth', users[0].tokens[0].token)
      .expect(404)
      .end(done);

  });

  it('should get return 404 when id not found', (done) => {

    let notFoundId = new ObjectID();

    request(app)
      .get(`/todos/${notFoundId}`)
      .set('x-auth', users[0].tokens[0].token)
      .expect(404)
      .expect((res) => {
        expect(res.body.message).toInclude('not found');
      })
      .end(done);

  });

  it('should get return 404 when id is invalid', (done) => {

    let invalidId = 'INVALIDID934865793845793874';

    request(app)
      .get(`/todos/${invalidId}`)
      .set('x-auth', users[0].tokens[0].token)
      .expect(404)
      .expect((res) => {
        expect(res.body.message).toInclude('not valid');
      })
      .end(done);

  });

});

describe('DELETE /todos/:id', ()  => {

  it('should remove the todo', (done) => {

    let hexId = todos[1]._id.toHexString();

    request(app)
      .delete(`/todos/${hexId}`)
      .set('x-auth', users[1].tokens[0].token)
      .expect(200)
      .expect((res) => {
        expect(res.body.todo._id).toBe(hexId);
        expect(res.body.todo.text).toBe(todos[1].text);
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

  it('should not remove the todo created by other user', (done) => {

    let hexId = todos[1]._id.toHexString();

    request(app)
      .delete(`/todos/${hexId}`)
      .set('x-auth', users[0].tokens[0].token)
      .expect(404)
      .end((err, res) => {
        if (err) {
          return done(err);
        }

        Todo.findById(hexId).then((todo) => {
          expect(todo).toExist();
          done();
        }).catch((e) => done(e));
      });

  });

  it('should get return 404 when id not found', (done) => {

    let notFoundId = new ObjectID();

    request(app)
      .delete(`/todos/${notFoundId}`)
      .set('x-auth', users[1].tokens[0].token)
      .expect(404)
      .expect((res) => {
        expect(res.body.message).toInclude('not found');
      })
      .end(done);

  });

  it('should get return 404 when id is invalid', (done) => {

    let invalidId = 'INVALIDID934865793845793874';

    request(app)
      .delete(`/todos/${invalidId}`)
      .set('x-auth', users[1].tokens[0].token)
      .expect(404)
      .expect((res) => {
        expect(res.body.message).toInclude('not valid');
      })
      .end(done);

  });

});

describe('PATCH /todos/:id' , () => {

  it('should update the todo', (done) => {

    let hexId = todos[0]._id.toHexString();
    let text = 'New text to do';
    let completed = true;

    request(app)
      .patch(`/todos/${hexId}`)
      .set('x-auth', users[0].tokens[0].token)
      .send({ text, completed })
      .expect(200)
      .expect((res) => {
        expect(res.body.todo._id).toBe(hexId);
        expect(res.body.todo.text).toBe(text);
        expect(res.body.todo.completed).toBe(true);
        expect(res.body.todo.completedAt).toBeA('number');
        expect(res.body.todo.completedAt).toNotBe(333);
      })
      .end((err, res) => {
        if (err) {
          return done(err);
        }

        Todo.findById(hexId).then((todo) => {
          expect(todo).toExist();
          expect(todo._id.toHexString()).toBe(hexId);
          expect(todo.text).toBe(text);
          expect(todo.completed).toBe(true);
          expect(todo.completedAt).toBeA('number');
          expect(todo.completedAt).toNotBe(333);
          done();
        }).catch((e) => done(e));
      });

  });

  it('should not update the todo reated by other user', (done) => {

    let hexId = todos[0]._id.toHexString();
    let text = 'New text to do';
    let completed = true;

    request(app)
      .patch(`/todos/${hexId}`)
      .set('x-auth', users[1].tokens[0].token)
      .send({ text, completed })
      .expect(404)
      .end((err, res) => {
        if (err) {
          return done(err);
        }

        Todo.findById(hexId).then((todo) => {
          expect(todo).toExist();
          expect(todo._id.toHexString()).toBe(hexId);
          expect(todo.text).toNotBe(text);
          expect(todo.completed).toNotExist();
          done();
        }).catch((e) => done(e));
      });

  });

  it('should clear completedAt when todo is not completed', (done) => {
    // grab id of second todo item
    let secondHexId = todos[1]._id.toHexString();
    // update text , set completed to false
    let text = 'New second text to do';
    let completed = false;

    // 200, res.body changed
    request(app)
      .patch(`/todos/${secondHexId}`)
      .set('x-auth', users[1].tokens[0].token)
      .send({ text, completed })
      .expect(200)
      .expect((res) => {
        expect(res.body.todo._id).toBe(secondHexId);
        expect(res.body.todo.text).toBe(text);
        expect(res.body.todo.completed).toBe(false);
        expect(res.body.todo.completedAt).toNotExist();
      })
      .end((err, res) => {
        if (err) {
          return done(err);
        }

        Todo.findById(secondHexId).then((todo) => {
          expect(todo).toExist();
          expect(todo._id.toHexString()).toBe(secondHexId);
          expect(todo.text).toBe(text);
          expect(todo.completed).toBe(false);
          expect(todo.completedAt).toNotExist();
          done();
        }).catch((e) => done(e));
      });

  });

  it('should get return 404 when id not found', (done) => {

    let notFoundId = new ObjectID();

    request(app)
      .patch(`/todos/${notFoundId}`)
      .set('x-auth', users[1].tokens[0].token)
      .expect(404)
      .expect((res) => {
        expect(res.body.message).toInclude('not found');
      })
      .end(done);

  });

  it('should get return 404 when id is invalid', (done) => {

    let invalidId = 'INVALIDID934865793845793874';

    request(app)
      .patch(`/todos/${invalidId}`)
      .set('x-auth', users[1].tokens[0].token)
      .expect(404)
      .expect((res) => {
        expect(res.body.message).toInclude('not valid');
      })
      .end(done);

  });
});

describe('GET /users/me', () => {

  it('should return user if authenticated', (done) => {
    request(app)
      .get('/users/me')
      .set('x-auth', users[0].tokens[0].token)
      .expect(200)
      .expect((res) => {
        expect(res.body._id).toBe(users[0]._id.toHexString());
        expect(res.body.email).toBe(users[0].email);
      })
      .end(done);
  });

  it('should return 401 if not authenticated', (done) => {
    request(app)
      .get('/users/me')
      .expect(401)
      .expect((res) => {
        expect(res.body).toEqual({});
      })
      .end(done);
  });

  it('should return 401 if BAD authenticated', (done) => {
    request(app)
      .get('/users/me')
      .set('x-auth', 'BAD-AUTH-TOKEN')
      .expect(401)
      .expect((res) => {
        expect(res.body).toEqual({});
      })
      .end(done);
  });

});

describe('POST /users', () => {

  it('should create a user', (done) => {
    let email = 'example@example.com';
    let password = '123abc!';

    request(app)
      .post('/users')
      .send({ email, password })
      .expect(200)
      .expect((res) => {
        expect(res.headers['x-auth']).toExist();
        expect(res.body._id).toExist();
        expect(res.body.email).toBe(email);
      })
      .end((err) => {
        if (err) {
          return done(err);
        }

        User.findOne({email}).then((user) => {
          expect(user).toExist();
          expect(user.password).toNotBe(password);
          expect(user.email).toBe(email);
          expect(bcrypt.compareSync(password, user.password)).toBeTruthy();
          done();
        }).catch((e) => done(e));
      });
  });

  it('should return validation errors if request invalid', (done) => {

    request(app)
      .post('/users')
      .send({ email: 'invalid11' })
      .expect(400)
      .expect((res) => {
        expect(res.body._id).toNotExist();
        expect(res.body.errors).toExist();
        expect(res.body.errors.email).toExist();
        expect(res.body.errors.password).toExist();
        expect(res.body.message).toContain('validation');
      })
      .end(done);

  });

  it('should not create user if email in use', (done) => {
    let repEmail = users[0].email;

    request(app)
      .post('/users')
      .send({email: repEmail, password: 'abc123'})
      .expect(400)
      .expect((res) => {
        expect(res.body['errmsg']).toExist();
        expect(res.body.errmsg).toContain('duplicate');
      })
      .end(done);

  });

});

describe('POST /users/login', () => {

  it('should login user and return auth token', (done) => {
    let { email, password } = users[1];

    request(app)
      .post('/users/login')
      .send({email, password})
      .expect(200)
      .expect((res) => {
        expect(res.headers['x-auth']).toExist();
        expect(res.body._id).toBe(users[1]._id.toHexString());
        expect(res.body.email).toBe(email);
      })
      .end((err, res) => {
        if (err) {
          return done(err);
        }

        User.findById(users[1]._id).then((user) => {
          expect(user.tokens[1]).toInclude({
            access: 'auth',
            token: res.headers['x-auth']
          });
          done();
        }).catch((e) => done(e));
      });

  });

  it('should reject invalid login', (done) => {

    request(app)
      .post('/users/login')
      .send({
        email: users[1].email,
        password: 'nopas'
      })
      .expect(400)
      .expect((res) => {
        expect(res.headers['x-auth']).toNotExist();
      })
      .end((err) => {
        if (err) {
          return done(err);
        }

        User.findById(users[1]._id).then((user) => {
          expect(user.tokens.length).toEqual(1);
          done();
        }).catch((e) => done(e));
      });
  });

});

describe('DELETE /users/me/token', () => {

  it('should remove auth token on logout', (done) => {

    request(app)
      .delete('/users/me/token')
      .set('x-auth', users[0].tokens[0].token)
      .expect(200)
      .end((err) => {
        if (err) {
          done(err);
        }

        User.findById(users[0]._id).then((user) => {
          expect(user.tokens).toEqual([]);
          done();
        }).catch((e) => done(e));

      });

  });

});
