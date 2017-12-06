const React = require('react')
module.exports = ({list, rm}) => {
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
