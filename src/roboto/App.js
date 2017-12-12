const TodoList = require('./TodoList')

module.exports = (notify, init) =>{
  const App = Object.assign({
    todoLists: []
  }, init)
  App.todoLists = App.todoLists.map(list => TodoList(notify, list))
  const addList = target => () => {
    const todoList = TodoList(notify)
    App.todoLists = App.todoLists.concat(todoList)
    notify()
  }

  const rmList = target => index => {
    App.todoLists = App.todoLists.filter((item, _index) => {
      const rm = _index!==index
      !rm && clearInterval(item.int)
      return rm
    })
    notify()
  }

  const todoLists = target => App.todoLists
  const get = {
    addList,
    rmList,
    todoLists,
    toJSON: ()=> App
  }

  const set = {
  }

  return new Proxy(App, {
    get: (oTarget, sKey) => {
      if(get[sKey]){
        return get[sKey](oTarget)
      }
      return App[sKey]
    },
    set: (oTarget, sKey, vValue) => {
      if(set[sKey]){
        set[sKey](vValue, oTarget);
        return true
      }else{
        App[sKey] = vValue
        notify()
      }
    }
  });

}
