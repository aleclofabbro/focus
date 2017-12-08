const R = require('ramda')

const root = (init, initialState) => {
  let state = {}
  let reduction = null
  let flag = true
  const root = R.lens(() => state, _state => {
    console.log('-------------------')
    if(state !== _state){
      state = _state
      reduction = loop(focus)
      if(flag){
        flag = false
        setTimeout(()=>{
          next(state, reduction)
          reduction = null
          flag = true
        })
      }
    }
  })
  const focus = _focus(root)
  const {next, loop} = init(focus)
  focus.set(initialState)
}

const _focus = (lens) => {
  const focus = (on) => {

    on = 'string' === typeof on ? R.lensPath(on.split('.')) :
         'number' === typeof on ? R.lensIndex(on) :
         Array.isArray(on) ? R.lensPath(on) :
         on

    const on_lens = R.compose(lens, on)
    return _focus(on_lens)
  }
  const set = val => {
    if(val !== view()){
      R.set(lens, val, null)
    }
  }
  const over = over_fn => {
    set(over_fn(view()))
  }
  const view = () => R.view(lens, null)

  return {
    set,
    over,
    view,
    lens,
    focus
  }
}

module.exports = root
