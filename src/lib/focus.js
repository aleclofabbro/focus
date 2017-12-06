const R = require('ramda')
const Rx = require('rxjs')

const root = (next, init_state) => {
  let state
  const root = R.lens(() => state, _state => {
    if(state !== _state){
      state = _state
      next(_state)
    }
  })
  const focus = _focus(root)
  return {
    ...focus,
    start: () => focus.set(init_state)
  }
}

const is_empty = v => {
  return v === null ||
    v === void 0 ||
    v !== v
}

const _focus = (lens, {ns}={}) => {
  let default_to
  const focus = (on, {ns}={}) => {
    ns = ns ? ns : 'string' === typeof on ? on.split('.') : ns
    on = 'string' === typeof on ? R.lensPath(on.split('.')) : on
    const on_lens = R.compose(lens, on)
    return _focus(on_lens, {ns})
  }
  const set = R.set(lens, R.__, null)
  const over = R.over(lens, R.__, null)
  const view = () => R.view(lens, null)
  const defaultTo = (def, _is_empty) => {
    if((_is_empty || is_empty)(view())) {
      default_to = def
      // set(def)
    }
  }
  return {
    defaultTo,
    set,
    over,
    view,
    lens,
    focus
  }
}

module.exports = root
