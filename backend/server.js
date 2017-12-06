// dev-server.js
const R = require('ramda');
const express = require('express');
const body_parser = require('body-parser');
const uuidv1 = require('uuid/v1');
const app = express();
app.use(body_parser.json())
// Import routes
// require('./_routes')(app);   // <-- or whatever you do to include your API endpoints and middleware
let todos = [
[{"id":"bf4cf780-d9e5-11e7-952d-0fece1795b89","title":"qqqq","body":"yyy"},{"id":"bf74cad0-d9e5-11e7-952d-0fece1795b89","title":"www","body":"yyy"}]]
app.set('port', 9090);


app.get('/', (req,  res) => res.send(todos));
app.get('/:id', (req,  res) => res.send(todos.find(todo => todo.id === req.params.id)));
app.delete('/:id', (req,  res) => {
  const id = req.params.id
  const todo = R.find(todo=>todo.id === id, todos)
  if(todo){
    todos = R.reject(_todo => _todo.id === todo.id, todos)
    res.send(todo)
  }else{
    res.status(404).send('NOT FOUND')
  }
});
app.post('/', (req,  res) => {
  const todo = req.body
  todo.id = uuidv1()
  todos = R.append(todo, todos)
  res.send(todo.id);
})
app.put('/', (req,  res) => {
  const upd_todo = req.body
  const id = upd_todo.id
  const todo = R.find(todo=>todo.id === id, todos)
  if(todo){
    todos = todos.map(todo => todo.id==upd_todo.id ? upd_todo : todo)
    res.send(upd_todo.id);
  }else{
    res.status(404).send('NOT FOUND')
  }
})


app.listen(app.get('port'), function() {
    console.log('Node App Started');
});
