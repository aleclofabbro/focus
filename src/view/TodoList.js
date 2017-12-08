const React = require('react')
module.exports = ({list, rm, add}) => {
  // console.log('TodoList view')
  return (
    <div>
      <button onClick={add}>addtodo</button>

      <ul>
        {
          list.map((todo, ix) => (
            <li key={ix} onClick={()=>rm(ix)}>{todo.title}</li>
          ))
        }
      </ul>
    </div>
  )
}
