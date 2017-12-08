const R = require('ramda')
const connect = require('../../lib/connect')
const TodoList = require('../../view/TodoList')
module.exports = (TodoList_F) => {
  const {view, set, over} = TodoList_F
  over(val => val || [{title:'a'},{title:'b'}])
  const rm = (ix) => set(R.remove(ix, 1, view()))
  const getById = (id) => view().find(todo => todo.id === id)
  return connect(TodoList, (ownProps)=>{
    return {
      getById,
      list: view(),
      rm
    }
  })
}
