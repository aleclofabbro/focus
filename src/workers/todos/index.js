const R = require('ramda')
const todos = ({defaultTo, view, set}) => {
  defaultTo(val => [{title:'a'},{title:'b'}])
  const rm = (ix) => set(R.remove(ix, 1, view()))
  const getById = (id) => view().find(todo => todo.id === id)
  return {
    view,
    set,
    getById,
    rm
  }
}

module.exports = todos
