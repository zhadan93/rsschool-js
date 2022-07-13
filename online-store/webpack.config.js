const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const ESlintWebpackPlugin = require('eslint-webpack-plugin');

const devServer = (isDev) => !isDev ? {} : {
  devServer: {
    open: true,
    hot: true,
  }
};

const getStyleLoader = (isDev) => isDev ? 'style-loader' : MiniCssExtractPlugin.loader;

module.exports = ({develop}) => ({
  mode: develop ? 'development' : 'production',

  devtool: develop ? 'inline-source-map' : false,

  entry: {
    app: './src/index.ts',
  },

  output: {
    path: path.resolve(__dirname, './dist'),
    filename: '[name].[contenthash].js',
    assetModuleFilename: 'assets/[hash][ext]',
  },

  module: {
    rules: [
      {
        test: /\.(png|svg|jpg|jpeg|ico|gif)$/i,
        type: 'asset/resource',
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/i,
        type: 'asset/resource',
      },
      {
        test: /\.[tj]s$/i,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.css$/i,
        use: [getStyleLoader(develop), 'css-loader'],
      },
    ]
  },

  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html',
      title: 'Online Store',
    }),

    new MiniCssExtractPlugin({
      filename: '[name].[contenthash].css',
    }),

    new CleanWebpackPlugin({
      cleanStaleWebpackAssets: false,
    }),

    new ESlintWebpackPlugin ({
      extensions: ['ts', 'js'],
    }),
    
    new CopyWebpackPlugin({
      patterns: [
        {from: './src/public'}
      ]
    }),
  ],

  resolve: {
    extensions: ['.ts', '.js'],
  },

  ...devServer(develop),
});
