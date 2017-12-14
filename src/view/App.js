const React = require('react')
const TodoList = require('./TodoList')
module.exports = ({app}) => {
  // console.log('App view')
  return (
    <div>
      <h1>TODO APP</h1>
      <button onClick={() => app.addList = null }>add</button>
      <hr/>
      {app.todoLists.map((todoList, i)=> (
        <div key={i}>
          <h2>TODO LIST {i}</h2>
          <button onClick={()=> app.rmList = i}>remove</button>
          <TodoList todoList={todoList} />
          <hr/>
        </div>
      ))}
    </div>
  )
}
