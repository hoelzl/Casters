// webpack.config.js
const path = require("path");

const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  mode: "development", // or 'production'
  entry: "./src/web/App.tsx",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "bundle.js",
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: "ts-loader",
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: [".tsx", ".ts", ".js"],
    alias: {
      // Match the path aliases from tsconfig.json
      casters_core: path.resolve(__dirname, "../casters_core/src/"),
    },
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./src/web/index.html",
    }),
  ],
  devServer: {
    static: {
      directory: path.join(__dirname, "dist"),
    },
    compress: true,
    port: 9000,
  },
};
