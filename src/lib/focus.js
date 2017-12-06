const R = require('ramda')
const Rx = require('rxjs')

const root = (init_state) => {
  const state = new Rx.BehaviorSubject(init_state)
  const state$ = state.observeOn(Rx.Scheduler.queue)//.subscribeOn(Rx.Scheduler.queue)
  const root = R.lens(() => state.value, _state => {
    state.next(_state)
  })
  return _focus(root, state$)
}

const is_empty = v => {
  return v === null ||
    v === void 0 ||
    v !== v
}

const _focus = (lens, state$, {ns}={}) => {
  const focus = (on, {ns}={}) => {
    ns = ns ? ns : 'string' === typeof on ? on.split('.') : ns
    on = 'string' === typeof on ? R.lensPath(on.split('.')) : on
    const on_lens = R.compose(lens, on)
    const on_state$ = state$.map(R.view(on_lens)).distinctUntilChanged()
    return _focus(on_lens, on_state$, {ns})
  }
  const set = R.set(lens, R.__, null)
  const over = R.over(lens, R.__, null)
  const view = () => R.view(lens, null)
  const defaultTo = (def, _is_empty) => {
    if((_is_empty || is_empty)(view())) {
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
    state$
  }
}

module.exports = root
