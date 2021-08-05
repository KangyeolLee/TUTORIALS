/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable no-undef */
const path = require('path');
const dotenv = require('dotenv-webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = (env) => {
  return {
    entry: './src/main.ts',
    module: {
      rules: [
        {
          test: /\.(ts|js)$/,
          use: {
            loader: 'babel-loader',
          },
          exclude: ['/node_modules'],
        },
        {
          test: /\.(css|scss)$/,
          use: [
            MiniCssExtractPlugin.loader,
            'css-loader',
            {
              loader: 'sass-loader',
              options: {
                implementation: require('sass'), //dart-sass 적용
              },
            },
          ],
        },
        {
          test: /\.(png|jpe?g|gif|svg)$/i,
          use: {
            loader: 'url-loader',
            options: {
              esModule: false,
              limit: 8192,
              name: 'assets/[name]?[hash].[ext]',
            },
          },
        },
      ],
    },
    plugins: [
      new HtmlWebpackPlugin({ template: './src/index.html' }),
      new MiniCssExtractPlugin({
        filename: '[name].css',
        chunkFilename: '[id].css',
      }),
      new CleanWebpackPlugin(),
      new dotenv({
        path: env.production ? '../.env.prod' : '../.env.dev',
      }),
    ],
    optimization: { minimize: true },
    output: {
      publicPath: '/',
      path: path.join(__dirname, './dist'),
      filename: '[name].js',
    },
    devServer: {
      historyApiFallback: true,
      contentBase: path.join(__dirname, 'dist'),
      publicPath: '/',
    },
    resolve: {
      modules: ['node_modules'],
      extensions: ['.ts', '.js', '.json', '.scss'],
      alias: {
        '@': path.join(__dirname, 'src'),
      },
    },
    devtool: 'source-map',
  };
};
