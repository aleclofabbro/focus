// static const
require('../assets/css/focus/core.scss')

// javascript
const R = require('ramda')
const React = require('react')
const ReactDOM = require('react-dom')
const AppRoboto = require('./roboto/App')
const AppView = require('./view/App')

const saved_state = JSON.parse(sessionStorage.getItem('todostate'))
const default_state = null && {
  count:0,
  todoLists:[]
}


const elem = document.getElementById('focus')
const render = () => {

  sessionStorage.setItem('todostate', JSON.stringify(appRoboto))
  console.log('---Render---', appRoboto)
  ReactDOM.render((
    <AppView app={appRoboto} />
  ), elem)
}

const appRoboto = AppRoboto(() => {

  render()
  if (module.hot) {
    module.hot.accept('./view/App', render)
  }
} ,saved_state)

render()
