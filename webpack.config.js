
module.exports = function(env) {
  return require(`./webpack.${env ? env : 'dev'}.js`)
}