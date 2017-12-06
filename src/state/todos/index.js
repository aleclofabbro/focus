const R = require('ramda')
const todos = (L_list) => {
  // const L_list = R.compose(state, R.lensProp('list'))
  R.over(L_list, list => list || [], null)
  const rm = (ix) => R.over(L_list, list => R.remove(ix, 1, list), null)
  const get = () => R.view(L_list, null)
  const set = () => R.set(L_list, R.__, null)
  const getById = (id) => getList().find(todo => todo.id === id)
  return {
    get,
    set,
    getById,
    rm
  }
}

module.exports = todos
