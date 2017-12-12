

module.exports = (notify, init) =>{

  const TodoList = Object.assign({
    list: [],
    count:0
  }, init)

  const add = target => todo => {
    // const todo = Todo(_todo)
    TodoList.list = [todo].concat(TodoList.list)
    notify()
  }

  const rm = target => index => {
    TodoList.list = TodoList.list.filter((item, _index) => _index!==index)
    notify()
  }

  const list = target => TodoList.list

  const get = {
    add,
    rm,
    list,
    toJSON: ()=> TodoList
  }

  const set = {
  }


  const p = new Proxy(TodoList, {
    get: (oTarget, sKey) => {
      if(get[sKey]){
        return get[sKey](oTarget)
      }
      return TodoList[sKey]
    },
    set: (oTarget, sKey, vValue) => {
      if(set[sKey]){
        set[sKey](vValue, oTarget);
        return true
      }else{
        TodoList[sKey] = vValue
        notify()
      }
    }
  });
setTimeout(()=> p.int = setInterval(()=>{++p.count;console.log('to')}, 1000))

  return p
}
