const R = require('ramda')
const Rx = require('rxjs')

module.exports = () => {
  const state = new Rx.BehaviorSubject({todos:[{title:'a'},{title:'b'}]})
  const state$ = state.observeOn(Rx.Scheduler.queue)//.subscribeOn(Rx.Scheduler.queue)
  const event_out = Rx.Observable.create(observer => event$.subscribe(observer))
  const event_in = {
    next: event => event$.next(event)
  }
  const event$ = new Rx.AnonymousSubject(event_in, event_out)
  const root = R.lens(() => state.value, _state => {
    // console.log(state.value,`->`,_state)
    state.next(_state)
  })
 

  return {
    root,
    event$,
    state$
  }
}
