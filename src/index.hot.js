// static const
require('../assets/css/focus/core.scss')

// javascript
const React = require('react')
const ReactDOM = require('react-dom')

const Focus = require('./lib/focus')

const app_connection = require('./connections/app')


Focus((root) => {
  const elem = document.getElementById('focus')
  const render = (state, App) => {
    console.log(state,'---state---',)
    ReactDOM.render((
      <App />
    ), elem)
  }
  if (module.hot) {
    module.hot.accept('./view/App', render)
  }
  return {
    next: render,
    loop: app_connection
  }
},{todoLists:[null,null]})
