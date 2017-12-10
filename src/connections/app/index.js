const React = require('react')
const R = require('ramda')
const App = require('../../view/App')
const app_worker = require('../../workers/app')
const todos_connection = require('../todos')

module.exports = (App_F) => {
  const {view, set, over, focus} = App_F
  const worker = app_worker(App_F)
  const todoLists_F = App_F.focus('todoLists')
  const TodoLists = todoLists_F.view()
    .map((todolist, index) => todos_connection(todoLists_F.focus(index), index))
  return (ownProps)=>(
    <App {...ownProps} {...{TodoLists}} {...worker} />
  )
}
