const BabiliPlugin = require('babili-webpack-plugin')

module.exports = {
  /*
  ** Electron Settings
  */
  electron: {
    width: 1148,
    height: 768
  },
  build: {
    extend (config, { isDev ,isClient }) {
      // Extend only webpack config for client-bundle
      if (isClient) {
        config.target = 'electron-renderer'
      }
      if(!isDev) {
        config.plugins = config.plugins.filter((plugin) => plugin.constructor.name !== 'UglifyJsPlugin')
        config.plugins.push(new BabiliPlugin())
      }
    }
  }
}
