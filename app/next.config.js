const withTypescript = require('@zeit/next-typescript')
const path = require('path')

module.exports = withTypescript({
  webpack: config => {
    // Alias all `react-native` imports to `react-native-web`
    config.resolve.alias = {
      ...(config.resolve.alias || {}),
      'react-native$': 'react-native-web',
      react: path.resolve('./node_modules/react')
    }
    return config
  },
  distDir: '../dist/functions/next'
})
