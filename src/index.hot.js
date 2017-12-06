// static const
require('../assets/css/focus/core.scss')

// javascript
const R = require('ramda')
const React = require('react')
const ReactDOM = require('react-dom')

const connect = require('./lib/connect')
const _focus = require('./lib/focus')
const _todos_state = require('./state/todos')
const _todos_service = require('./services/todos')

const _App = require('./view/App')
const _TodoList = require('./view/TodoList')


const be = 'http://localhost:8080/'
const elem = document.getElementById('focus')

const {root, event$, state$} = _focus()
const todos_state = _todos_state(R.compose(root, R.lensProp('todos')))
const todos_service = _todos_service({be})
const App = connect(_App, (ownProps)=>{
  return {
    TodoList
  }
})
const TodoList = connect(_TodoList, (ownProps)=>{
  return {
    list: todos_state.get(),
    rm: todos_state.rm
  }
})

const render = (state) => {
  console.log(state,'---state---',)
  ReactDOM.render((
    <App />
  ), elem)
}

state$
  .subscribe(render)


if (module.hot) {
  module.hot.accept('./view/App', render)
}
