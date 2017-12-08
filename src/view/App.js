const React = require('react')
module.exports = ({TodoLists, addList, rmList}) => {
  // console.log('App view')
  return (
    <div>
      <h1>TODO APP</h1>
      <button onClick={addList}>add</button>
      <hr/>
      {TodoLists.map((TodoList, i)=> (
        <div key={i}>
          <h2>TODO LIST {i}</h2>
          <button onClick={()=>rmList(i)}>remove</button>
          <TodoList />
          <hr/>
        </div>
      ))}
    </div>
  )
}
