const connect = require('../../lib/connect')
const App = require('../../view/App')
const todos_connection = require('../todos')
const R = require('ramda')

module.exports = (App_F) => {
  const {view, set, over, focus} = App_F
  over(val => val || {
    todoLists: []
  })
  const TodoLists_F = focus('todoLists')
  const addList = () => TodoLists_F.over(R.append(null))
  const rmList = R.compose(TodoLists_F.over, R.remove(R.__,1))
  const TodoLists = TodoLists_F.view()
    .map((todolist, index) => todos_connection(TodoLists_F.focus(index)))
  return connect(App, (ownProps)=>{
    return {
      addList,
      rmList,
      TodoLists
    }
  })
}
