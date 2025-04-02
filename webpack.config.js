// webpack.config.js
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  mode: "development",
  entry: "./src/index.js",
  output: {
    filename: "main.js",
    path: path.resolve(__dirname, "dist"),
    clean: true,
    // Add publicPath to ensure proper URL resolution
    publicPath: '/'
  },
  devtool: "eval-source-map",
  module: {
    rules: [
      // JavaScript files
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader'
        }
      },
      // CSS files
      {
        test: /\.css$/i,
        use: ["style-loader", "css-loader"],
      },
      // HTML files - for processing HTML imports
      {
        test: /\.html$/,
        use: [
          {
            loader: 'html-loader',
            options: {
              minimize: false,
              esModule: false
            }
          }
        ]
      },
      // SVG files - improved approach to avoid encoding issues
      {
        test: /\.svg$/,
        type: 'asset/resource',
        generator: {
          filename: 'assets/images/[name][ext][query]'
        }
      },
      // Other image files
      {
        test: /\.(png|jpg|jpeg|gif)$/i,
        type: 'asset/resource',
        generator: {
          filename: 'assets/images/[name][ext]'
        }
      }
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./src/template.html",
      filename: 'index.html'
    }),
    new CopyWebpackPlugin({
        patterns: [
            { from: "src/svg-files-Weather", to: "svg-files-Weather" }, // Copies SVGs to dist/
        ],
    }),
  ],
  devServer: {
    static: [
      {
        directory: path.join(__dirname, 'dist'),
      },
      {
        directory: path.join(__dirname, 'src'),
        publicPath: '/',
        serveIndex: false,
      }
    ],
    compress: true,
    port: 8081,
    hot: true,
    // Add historyApiFallback for SPA-like behavior
    historyApiFallback: true,
    // Disable opening browser automatically to avoid potential issues
    open: false,
    // Add specific watch options
    watchFiles: {
      paths: ["./src/**/*"],
      options: {
        usePolling: false,
      },
    },
    // Add dev middleware options to handle encoding issues
    devMiddleware: {
      writeToDisk: false,
    },
  },
};

