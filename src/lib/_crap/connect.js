const React = require('react')
const connect = (Cmp, props) => {
  return (ownProps) => (
    <Cmp {...ownProps} {...props(ownProps)} />
  )
}

module.exports = connect
