export default val => {
  if (!val) return null
  return parseFloat(val.replace(',', ''))
}
