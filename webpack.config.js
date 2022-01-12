const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const autoprefixer = require('autoprefixer');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
console.log('环境=', process.env.NODE_ENV);

module.exports = {
  mode: 'production',
  // entry: './src/index.js',
  entry: {
    main: './src/index.js'
  },
  // entry: {
  //   main: "./src/index.js"
  // },
  output: {
    filename: "[name]-[hash:8].js",
    path: path.resolve(__dirname, "./dist")
  },
  module: {
    rules: [
      {
        test: /\.(sa|sc|le|c)ss$/i,
        use: [
          'style-loader',
          'css-loader',
          'less-loader',
          {
            loader: 'postcss-loader',
            options: {
              plugins: [
                autoprefixer({
                  overrideBrowserslist: ["last 2 version", ">1%"]
                })
              ]
            }
          },
          'sass-loader'
        ]
      },
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: [
          {
           loader: 'babel-loader?cacheDirectory=true',
           options: {
             presets: ['@babel/preset-env']
           }
          }
        ]
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({ template: './src/index.html' }),
    new CleanWebpackPlugin()
  ]
}