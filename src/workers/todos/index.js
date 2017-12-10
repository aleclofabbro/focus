const R = require('ramda')
const React = require('react')
const TodoList = require('../../view/TodoList')
module.exports = (TodoList_F, index) => {
  const {view, set, over} = TodoList_F
  const add = () => {
    const name = prompt('name')
    set(R.prepend({title:`title:${name}-${index}`,body:`body:${name}-${index}`}, view()))
  }
  const rm = (ix) => set(R.remove(ix, 1, view()))
  return {
    add,
    list: view(),
    rm
  }
}
