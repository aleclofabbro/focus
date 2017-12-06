// set = require('ramda/src/set')
// view = require('ramda/src/view')
// compose = require('ramda/src/compose')
// lens = require('ramda/src/lens')
// lensIndex = require('ramda/src/lensIndex')
// lensProp = require('ramda/src/lensProp')
const R = require('ramda')
const Rx = require('rxjs')
const state = new Rx.BehaviorSubject(null)
const state$ = state//.observeOn(Rx.Scheduler.queue).subscribeOn(Rx.Scheduler.queue)

const make_lens_state = next => {
  let state
  return R.lens(() => state, _state => {
    // console.log(state.value,`->`,_state)
    state = _state
    next(_state)
  })
}
const root = make_lens_state(state.next.bind(state))


const x = R.compose(root, R.lensProp('x'))
const c = R.compose(root, R.lensProp('c'))
const cb = R.compose(c, R.lensProp('b'))
const cd = R.compose(c, R.lensProp('d'))
const cb0 = R.compose(cb, R.lensIndex(0))

// const x_derived = R.compose(root, R.lensProp('x'),
const x_derived = R.compose(x,
  (function(){
    let v_str = ''
    let e = []
    let a = []
    const lens = R.lens(
      x => {
        if(!x){
          return e
        } else if(x === v_str){
          return a
        } else {
          vstr = x
          a = x.split(',')
          return a
        }
      },
      (x, s) => {
        if(!x || x.length === 3){
          a = e
          v_str = ''
        } /*else if(s === v_str){
          return s
        }*/ else {
          a = x
          v_str = x.join(',')
        }
        return v_str
      })
      return lens
    })()
)

const x0_derived = R.compose(x_derived, R.lensIndex(0))

//
console.log('+initial state')
R.set(root, {}, state)
R.set(c, {}, null)
R.set(cb, [], null)
R.set(cb0, 10, null)
R.set(x_derived, ['1','2'], null)
console.log('-initial state')



// state$.map(R.view(cb0)).distinctUntilChanged().subscribe(v => v  && R.set(cb0, v+1, null) )
// state$.map(R.view(cb0)).distinctUntilChanged().subscribe(v => console.log(`cb0 ${JSON.stringify(v)}`))
state$.map(R.view(x_derived)).distinctUntilChanged().subscribe(v => console.log(`x_derived ${JSON.stringify(v)}`))
state$.map(R.view(x0_derived)).distinctUntilChanged().subscribe(v => console.log(`x0_derived ${JSON.stringify(v)}`))
state$.map(R.view(x)).distinctUntilChanged().subscribe(v => console.log(`x ${JSON.stringify(v)}`))

R.set(cb, [1], null)
R.set(cb0, 100, null)
R.set(x_derived, ['3','4'], null)
R.set(x, '4,66,6', null)
R.set(x_derived, ['1','2', '3'], null)
R.set(x_derived, ['2', '3'], null)
R.set(x_derived, ['2', '3'], null)
R.set(x0_derived, '12', null)
