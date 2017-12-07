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
  const next = init(focus)
  next(state)
}


const _focus = (lens, {ns}={}) => {
  let default_to
  let is_empty = v => {
    return v === null ||
      v === void 0 ||
      v !== v
  }
  const focus = (on, {ns}={}) => {
    ns = ns ? ns : 'string' === typeof on ? on.split('.') : ns
    on = 'string' === typeof on ? R.lensPath(on.split('.')) : on
    const on_lens = R.compose(lens, on)
    return _focus(on_lens, {ns})
  }
  const set = R.set(lens, R.__, null)
  const over = R.over(lens, R.__, null)
  const view = () => {
    const val = R.view(lens, null)
    return is_empty(val) ? default_to : val
  }
  const defaultTo = (def, _is_empty) => {
    is_empty = _is_empty || is_empty
    default_to = def
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
