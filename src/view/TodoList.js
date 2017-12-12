const React = require('react')
module.exports = ({todoList}) => {
  // console.log('TodoList view')
  return (
    <div>
      <button onClick={()=>todoList.add({title:'title'})}>addtodo</button>
<span>{todoList.count}</span>  
      <ul>
        {
          todoList.list.map((todo, ix) => (
            <li key={ix} onClick={()=>todoList.rm(ix)}>{todo.title}</li>
          ))
        }
      </ul>
    </div>
  )
}
