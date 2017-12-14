const TodoList = require('./TodoList')

module.exports = (notify, init) =>{
  const App = Object.assign({
    todoLists: []
  }, init)
  App.todoLists = App.todoLists.map(list => TodoList(notify, list))
  const addList = (target, todo)  => {
    const todoList = TodoList(notify, todo)
    App.todoLists = App.todoLists.concat(todoList)
  }

  const rmList = (index,target) => {
    App.todoLists = App.todoLists.filter((item, _index) => {
      const rm = _index!==index
      !rm && clearInterval(item.int)
      return rm
    })
  }

  const todoLists = target => App.todoLists
  const get = {
    toJSON: ()=> App
  }

  const set = {
    addList,
    rmList
  }

  const p = new Proxy(App, {
    get: (oTarget, sKey) => {
      if(get[sKey]){
        return get[sKey](oTarget)
      }
      return App[sKey]
    },
    set: (oTarget, sKey, vValue) => {
      if(set[sKey]){
        set[sKey](vValue, oTarget);
      }else{
        App[sKey] = vValue
      }
      notify()
      return true
    }
  });

  return p

}
