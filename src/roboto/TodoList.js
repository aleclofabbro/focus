

module.exports = (notify, init) =>{

  const TodoList = Object.assign({
    list: [],
    count:0
  }, init)

  const add = (todo, target) => {
    // const todo = Todo(_todo)
    TodoList.list = [todo].concat(TodoList.list)
  }

  const rm = (index, target) => {
    TodoList.list = TodoList.list.filter((item, _index) => _index!==index)
  }


  const get = {
    toJSON: ()=> TodoList
  }

  const set = {
    add,
    rm
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
      }else{
        TodoList[sKey] = vValue
      }
      notify()
      return true
    }
  });
setTimeout(()=> p.int = setInterval(()=>{++p.count;/*console.log('to')*/}, 500))

  return p
}
