const R = require('ramda')

module.exports = (App_F) => {
  const {view, set, over, focus} = App_F
  console.log('1App conn', view())
  !view() && set({
      count:0,
      todoLists:[]
    })
  console.log('2App conn', view())
  const {todoLists, count} = view()
  const addList = () => {
    App_F.set({
      ...view(),
      todoLists: R.prepend([], focus('todoLists').view()),
      count: count+1
    })
  }
  const rmList = R.compose(focus('todoLists').over, R.remove(R.__,1))
  return {
    addList,
    rmList
  }
}
