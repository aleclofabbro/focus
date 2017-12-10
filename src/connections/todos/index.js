const React = require('react')
const TodoList = require('../../view/TodoList')
const worker = require('../../workers/todos')
module.exports = (TodoList_F, index) => {
  const {view, set, over} = TodoList_F

  return (props)=>(<TodoList {...props} {...worker(TodoList_F, index)}/>)
}
