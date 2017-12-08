const React = require('react')
module.exports = ({list, rm}) => {
  // console.log('TodoList view')
  return (
    <ul>
      {
        list.map((todo, ix) => (
          <li key={ix} onClick={()=>rm(ix)}>{todo.title}</li>
        ))
      }
    </ul>
  )
}
