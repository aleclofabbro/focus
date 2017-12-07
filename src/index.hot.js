// static const
require('../assets/css/focus/core.scss')

// javascript
const R = require('ramda')
const Rx = require('rxjs')
const React = require('react')
const ReactDOM = require('react-dom')

const connect = require('./lib/connect')
const Focus = require('./lib/focus')
const _todos_worker = require('./workers/todos')
const _todos_service = require('./services/todos')

const _App = require('./view/App')
const _TodoList = require('./view/TodoList')



Focus(({focus, set, defaultTo}) => {
  defaultTo({todos:[{title:'a'},{title:'b'}]})
  const be = 'http://localhost:8080/'
  const elem = document.getElementById('focus')

  const render = (state) => {
    console.log(state,'---state---',)
    ReactDOM.render((
      <App />
    ), elem)
  }

  if (module.hot) {
    module.hot.accept('./view/App', render)
  }

  const todos_worker = _todos_worker(focus('todos'))
  const todos_service = _todos_service({be})
  const App = connect(_App, (ownProps)=>{
    return {
      TodoList
    }
  })
  const TodoList = connect(_TodoList, (ownProps)=>{
    return {
      list: todos_worker.view(),
      rm: todos_worker.rm
    }
  })
  return render
})
