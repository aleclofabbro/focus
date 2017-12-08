const R = require('ramda')
const React = require('react')
const TodoList = require('../../view/TodoList')
module.exports = (TodoList_F, index) => {
  const {view, set, over} = TodoList_F
  // console.log('TodoList conn', view())
  // over(val => val || [{title:'a'},{title:'b'}])
  if(!view()){
    set([{title:`${index}a`},{title:`${index}b`}])
    return
  }

  const rm = (ix) => set(R.remove(ix, 1, view()))
  const getById = (id) => view().find(todo => todo.id === id)
  const ctl = {
    getById,
    list: view(),
    rm
  }
  return (props)=>(<TodoList {...props} {...ctl}/>)
}
