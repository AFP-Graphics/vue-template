const localesFiles = require.context('./', false, /.*\.txt$/)

const locales = {}

localesFiles.keys().forEach((file) => {
  const regexp = /^\.\/([a-z]{2})\.txt$/
  const locale = file.match(regexp)
  if (locale[1]) {
    locales[locale[1]] = import(file)
  }
})

export default locales
