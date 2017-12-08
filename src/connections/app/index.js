const React = require('react')
const R = require('ramda')
const App = require('../../view/App')
const todos_connection = require('../todos')

module.exports = (App_F) => {
  const {view, set, over, focus} = App_F
  // console.log('App conn', view())
  // over(val => val || {todoLists: []})
  if(!view()){
    set({todoLists: [], count:0 })
    return
  }
  const TodoLists_F = focus('todoLists')
  const addList = () => {
    TodoLists_F.over(R.append(null))
    // this would render twice
    // focus('count').over(R.inc)
    // every state change renders
    // ghange shold be atomic
  }
  // const addList = () => TodoLists_F.over(R.append(null))
  const rmList = R.compose(TodoLists_F.over, R.remove(R.__,1))
  const TodoLists = TodoLists_F.view()
    .map((todolist, index) => todos_connection(TodoLists_F.focus(index), index))
  const ctl = {
    addList,
    rmList,
    TodoLists
  }
  return (ownProps)=>(<App {...ownProps} {...ctl}/>)
}
