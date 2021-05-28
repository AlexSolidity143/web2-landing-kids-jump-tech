const path = require('path');

//HTML, Pug
const HtmlWebpackPlugin = require("html-webpack-plugin");
const HtmlWebpackPugPlugin = require("html-webpack-pug-plugin");

//SCSS
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
  entry: './src/main.js',
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'dist'),
  },
  module: {
    rules: [
      //HTML
      {
        test: /\.pug$/,
        loader: "pug-loader",
        options: {
          pretty: true
        },
      },
      {
        test: /\.m?js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env']
          }
        }
      },
      //SCSS
      {
        test: /\.s[ac]ss$/i,
        use: [
          MiniCssExtractPlugin.loader,
          "css-loader",
          {
            loader: "postcss-loader",
            options: {
              postcssOptions: {
                plugins: [
                  [
                    require('autoprefixer')
                  ],
                ],
              },
            },
          },
          "sass-loader",
        ]
      },
      //Fonts
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/i,
        loader: 'file-loader',
        options: {
          name: '/[name]/[name].[ext]',
          outputPath: 'static/font/',
        },
      },
      //Imgs
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        loader: 'file-loader',
        options: {
          name: '[name].[ext]',
          outputPath: 'static/img/',
        },
      },
    ]
  },
  plugins: [
    //HTML
    new HtmlWebpackPlugin({
      template: "./src/index.pug",
      filename: "index.html",
      minify: true
    }),
    new HtmlWebpackPugPlugin(),
    //SCC
    new MiniCssExtractPlugin({
      filename: "style.css",
    }),
  ]  
};