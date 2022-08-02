const webpack = require('webpack');
const path = require('path');
const CopyPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const HtmlMinimizerPlugin = require('html-minimizer-webpack-plugin');

const slash = (path) => {
  const isExtendedLengthPath = /^\\\\\?\\/.test(path);
  const hasNonAscii = /[^\u0000-\u0080]+/.test(path);

  if (isExtendedLengthPath || hasNonAscii) {
    return path;
  }

  return path.replace(/\\/g, '/');
};

const options = {
  mode: 'production',
  entry: {
    content: slash(path.join(__dirname, 'src', 'scripts', 'content.ts')),
    popup: slash(path.join(__dirname, 'src', 'scripts', 'popup.ts')),
  },
  output: {
    path: slash(path.join(__dirname, 'build', process.env.PLATFORM)),
    filename: '[name].js',
  },
  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx'],
  },
  module: {
    rules: [
      {
        test: /\.ts?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.s[ac]ss$/i,
        use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader'],
      },
    ],
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env.PLATFORM': JSON.stringify(process.env.PLATFORM),
    }),
    new CopyPlugin({
      patterns: [
        {
          from: slash(`src/platforms/manifest.${process.env.PLATFORM}.json`),
          to: 'manifest.json',
          transform: (content) =>
            Buffer.from(
              JSON.stringify({
                description: process.env.npm_package_description,
                version: process.env.npm_package_version,
                author: process.env.npm_package_author_name,
                homepage_url: process.env.npm_package_homepage,
                ...JSON.parse(content.toString()),
              })
            ),
        },
        {
          from: slash(path.join(__dirname, 'src', 'icons', '*.png')),
          to: slash('icons/[name][ext]'),
        },
        {
          from: slash(path.join(__dirname, 'src', 'templates', '*.html')),
          to: '[name].html',
        },
      ],
    }),
    new HtmlMinimizerPlugin(),
    new MiniCssExtractPlugin({
      filename: '[name].css',
    }),
    new webpack.LoaderOptionsPlugin({
      minimize: true,
      debug: false,
    }),
  ],
  optimization: {
    minimizer: [new CssMinimizerPlugin()],
  },
};

module.exports = options;
