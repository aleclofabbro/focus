const React = require('react')
const connect = (Cmp, props) => {
  return (ownProps) => (
    <Cmp {...props(ownProps)} />
  )
}

module.exports = connect
