const path = require('path');

module.exports = {
  name: 'gengine-js',
  entry: ['babel-polyfill', './src/index.ts'],
  output: {
    filename: 'gengine.js',
    path: path.resolve(__dirname + '/dist'),
    library: 'gengine',
    libraryTarget: 'umd',
    umdNamedDefine: true,
  },
  mode: 'production',
  module: {
    rules: [
      {
        test: /\.glsl$/,
        use: ['raw-loader'],
      },
      {
        test: /\.(js|jsx|ts|tsx)$/,
        exclude: '/node_modules',
        use: ['babel-loader'],
      },
    ],
  },
  resolve: {
    extensions: ['.ts', '.js', '.json'],
  },
};
