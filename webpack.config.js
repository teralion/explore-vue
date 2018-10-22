const path = require('path');

module.exports = {
  mode: 'development',
  resolve: {
    alias: {
      'vue$': 'vue/dist/vue.esm.js',
    },
  },
  entry: './app/index.js',
  output: {
    path: path.resolve(__dirname, 'app', 'build'),
    filename: 'index.js',
  },
}