module.exports = ({be}) => {

  const list = () => fetch(`${be}`)
  const get = id => fetch(`${be}/${id}`)

  return {
    list,
    get
  }
}
