// static const
require('../assets/css/focus/core.scss')

// javascript
const R = require('ramda')
const React = require('react')
const ReactDOM = require('react-dom')

const Focus = require('./lib/focus')

const app_connection = require('./connections/app')

const saved_state = JSON.parse(sessionStorage.getItem('todostate'))
const default_state = null && {
  count:0,
  todoLists:[]
}


Focus((root_F) => {
  root_F.use((__next_subject, __, subject_focus, frame) => {
    console.log('plugin:', __next_subject, __, subject_focus, frame)
    const tll = R.compose(subject_focus.lens, R.lensPath(['todoLists']))
      setTimeout(()=>{
        if(!R.view(tll, null) || !R.view(tll, null).length){
          R.over(tll,(tl)=>[[{title:'www'}], ...(tl||[])], null)
        }
      },1000)
  })
  const elem = document.getElementById('focus')
  const render = (state, App) => {
    sessionStorage.setItem('todostate', JSON.stringify(state))
    console.log('---Render---', state)
    ReactDOM.render((
      <App />
    ), elem)
  }
  if (module.hot) {
    module.hot.accept('./view/App', render)
  }
  setTimeout(()=>root_F.set(saved_state || default_state), 500)
  return {
    project: render,
    capture: app_connection
  }
})// ,saved_state)
