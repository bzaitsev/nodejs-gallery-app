const path = require('path'), 
      LiveReloadPlugin = require('webpack-livereload-plugin'),
      ExtractTextPlugin = require("extract-text-webpack-plugin");

let config = {
  entry: './src/js/index.js',
  output: {
    path: path.resolve(__dirname, './dist'),
    filename: 'index.js',
    publicPath: 'dist/'
  },
  devServer: {
    overlay: true
  },
  plugins: [
    new LiveReloadPlugin(),
    new ExtractTextPlugin("styles.css")
  ],  
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: '/node_modules/'
      }, {          
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
          fallback: "style-loader",
          use: "css-loader"
        })      
      }
    ]
  }
};

module.exports = (env, options) => {
  let production = options.mode === 'production';
  
  config.devtool = production
    ? 'source-map'
    : 'eval-source-map';

  return config;
};