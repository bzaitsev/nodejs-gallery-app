const path = require('path'), 
      LiveReloadPlugin = require('webpack-livereload-plugin'),
      ExtractTextPlugin = require("extract-text-webpack-plugin");

const CLIENT_PATH = path.resolve(__dirname, 'src');

let config = {
  entry: './src/js/index.js',
  output: {
    path: path.resolve(__dirname, './build'),
    filename: 'index.js',
    publicPath: 'build/'
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
        test: /\.(png|jpg|jpeg|gif|ico|svg)$/,
        include: [CLIENT_PATH],
        use: {
          loader: 'file-loader',
          options: {

            esModule: false
          }
        }
      }, {
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