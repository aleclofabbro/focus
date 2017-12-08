const React = require('react')
const R = require('ramda')
const App = require('../../view/App')
const todos_connection = require('../todos')

module.exports = (App_F) => {
  const {view, set, over, focus} = App_F
  // console.log('App conn', view())
  if(!view()){
    set({
      count:0,
      todoLists:[]
    })
    return
  }
  const {todoLists, count} = view()
  const addList = () => {
    App_F.set({
      ...view(),
      todoLists: R.append([], todoLists),
      count: count+1
    })
  }
  const TodoLists_F = focus('todoLists')
  const rmList = R.compose(TodoLists_F.over, R.remove(R.__,1))
  const TodoLists = todoLists
    .map((todolist, index) => todos_connection(TodoLists_F.focus(index), index))
  const ctl = {
    addList,
    rmList,
    TodoLists
  }
  return (ownProps)=>(<App {...ownProps} {...ctl}/>)
}
