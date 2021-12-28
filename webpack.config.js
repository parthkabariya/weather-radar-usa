const path = require('path');

module.exports = {
  mode: "production",
  entry: "./src/index.jsx",
  output: {
    path: path.resolve("build"),
    filename: "index.js",
    libraryTarget: "commonjs2",
  },
  module: {
    rules: [
      {test: /\.jsx$/, exclude: /node_modules/, loader: "babel-loader"},
    ],
  },
  externals: {
    react: "react",
  },
};
