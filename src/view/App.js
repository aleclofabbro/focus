const React = require('react')
module.exports = ({TodoListA, TodoListB}) => {
  return (
    <div>
      <h1>TODO APP</h1>
      <hr/>
      <TodoListA />
      <TodoListB />
    </div>
  )
}
