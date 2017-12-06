const R = require('ramda')
const todos = ({defaultTo, lens, view, set}) => {
  // const lens = R.compose(state, R.lensProp('list'))
  defaultTo([{title:'a'},{title:'b'}])
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
