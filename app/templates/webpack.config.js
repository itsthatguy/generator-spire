module.exports = {
  devtool: '#source-map',
  output: {
    filename: '[name].js',
    sourcemapFilename: '[name].map'
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader'
      }
    ]
  },
  resolve: {
    extensions: ['', '.js']
  }
};
