const path = require('path');

module.exports = {
  mode: 'development',
  entry: "./src/script/index.ts",
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, "dist"),
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
  },
  devServer: {
    static: './dist',
   hot: true,
  },
}