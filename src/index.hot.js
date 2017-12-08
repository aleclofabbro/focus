// static const
require('../assets/css/focus/core.scss')

// javascript
const React = require('react')
const ReactDOM = require('react-dom')

const Focus = require('./lib/focus')

const app_connection = require('./connections/app')

const saved_state = JSON.parse(sessionStorage.getItem('todostate'))

Focus((root_F) => {
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
  setTimeout(()=>root_F.set(saved_state), 500)
  return {
    project: render,
    capture: app_connection
  }
})// ,saved_state)
