const R = require('ramda')

const root = (init) => {
  let state
  const root = R.lens(() => state, _state => {
    if(next && state !== _state){
      next(_state)
    }
    state = _state
  })
  const focus = _focus(root)
  const next = init(focus, {ns:[]})
  next(state)
}

const _focus = (lens, {ns}={}) => {
  ns = ns || []
  const _ns = ns
  const focus = (on, {ns}={}) => {
    ns = 'string' === typeof ns ? ns.split('.') : !ns ? 'string' === typeof on ? on.split('.') : [] : ns
    on = 'string' === typeof on ? R.lensPath(on.split('.')) : on
    const on_lens = R.compose(lens, on)
    return _focus(on_lens, {ns: _ns.concat(ns)})
  }
  const set = R.set(lens, R.__, null)
  const over = R.over(lens, R.__, null)
  const view = () => R.view(lens, null)
  const defaultTo = fn => {
    const val = view()
    const def = fn(val)
     if(def !== val) {
      set(def)
    }
  }
  return {
    defaultTo,
    set,
    over,
    view,
    lens,
    focus,
    ns
  }
}

module.exports = root
