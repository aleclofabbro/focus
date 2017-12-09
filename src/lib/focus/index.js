const R = require('ramda')

const Focus = (init, initial_subject) => {
  let subject
  let frame
  let _iterations_frame_cnt = 0
  const subject_lens = R.lens(() => subject, _next_subject => {
    console.log(`**`, _next_subject, __)
    // _next_subject = plugins.reduce((__next_subject,plugin)=>plugin(__next_subject, subject, __, subject_focus, frame), _next_subject)
    if(subject !== _next_subject){
      subject = _next_subject
      _iterations_frame_cnt++
      console.log(`--------${_iterations_frame_cnt}-----------`)
      // console.log(`^^^^^^^^${_iterations_frame_cnt}^^^^^^^^^^^`)
      const _deepest_iteration_frame = capture(subject_focus)
      _iterations_frame_cnt--
      // console.log(`vvvvvvvv${_iterations_frame_cnt}vvvvvvvvvvv`)
      if(!frame){
        frame = _deepest_iteration_frame
      }
      if(!_iterations_frame_cnt){
        project(subject, frame)
        frame = void 0
      }
    }
  })
  const subject_focus = _focus(subject_lens)
  const {project, capture} = init(subject_focus)
  subject_focus.set(initial_subject)
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
  const over = over_fn => R.compose(set, over_fn, view)()
  const view = () => R.view(lens, null)

  return {
    set,
    over,
    view,
    lens,
    focus
  }
}

module.exports = Focus
