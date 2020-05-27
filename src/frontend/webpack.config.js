const path = require("path");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const BUILD_DIR = path.resolve(__dirname, "./../backend/public/build");
const APP_DIR = path.resolve(__dirname, "src");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const RemovePlugin = require("remove-files-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

const basePath = __dirname;
const targetPath = "../backend/public/*";
const targetFolder = "dist";

module.exports = {
  mode: "development",
  entry: {
    main: APP_DIR + "/index.js"
  },
  output: {
    filename: "bundle.js",
    path: BUILD_DIR
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/react"]
          }
        }
      },
      {
        test: /\.css$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              hmr: true
            }
          },
          "css-loader"
        ]
      },
      {
        test: /\.(jpe?g|png|gif|svg)$/i,
        use: [
          {
            loader: "file-loader",
            options: {
              name: "../[path][name].[ext]"
            }
          }
        ]
      }
    ]
  },
  resolve: {
    extensions: [".js", ".jsx"]
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: "bundle.css",
      chunkFilename: "[id].css"
    }),
    new CopyWebpackPlugin([
      {
        from: "public", //Will resolve to RepoDir/src/assets
        to: "./.." //Copies all files from above dest to dist/assets
      }
    ]),
    new CleanWebpackPlugin({
      dry: false,
      verbose: true,
      cleanStaleWebpackAssets: false,
      protectWebpackAssets: false,
      cleanOnceBeforeBuildPatterns: [basePath + "/" + targetPath],
      dangerouslyAllowCleanPatternsOutsideProject: true
    })
  ]
};
