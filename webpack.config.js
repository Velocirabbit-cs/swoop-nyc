const path = require("path");
const fs = require("fs");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const Dotenv = require("dotenv-webpack");

//cross-env plugin will need to be used for cross-platform compatibility
// console.log('NODE ENV', process.env.NODE_ENV);

module.exports = {
  //'entry' defines which module webpack should use to begin building out its internal
  entry: "./client/index.js",
  //'output' property tells webpack where to emit the bundles it creates and how to name these files
  output: {
    path: path.join(__dirname, "/build"),
    filename: "bundle.js",
    // publicPath: '/',
  },
  mode: process.env.NODE_EV, //or production and development
  resolve: {
    alias: {
      "@material/web": path.resolve(__dirname, "./node_modules/@material/web/"),
    },
    // modules: [
    //   path.resolve(__dirname, "node_modules"),
    // ],
  },
  module: {
    rules: [
      {
        test: /\.jsx?/, //checks for JSX files that we need to transpile
        exclude: /node_modules/, //ignore node modules when bundling jsx
        use: {
          loader: "babel-loader",
          options: {
            presets: [
              //['@babel/env', '@babel/react']
              ["@babel/preset-env", { targets: "defaults" }], //transpiles ES6 into ES5
              ["@babel/preset-react", { targets: "defaults" }], //transpiles react into JS
            ],
          },
        },
      },
      {
        test: /\.(css|scss)$/, ///\.s?ss$/
        exclude: /node_modules/,
        use: [
          //order is RIGHT TO LEFT
          // Creates `style` nodes from JS strings
          "style-loader",
          // Translates CSS into CommonJS
          "css-loader",
          // Compiles Sass to CSS
          "sass-loader",
        ],
      },
    ],
  }, //module end
  plugins: [
    new HtmlWebpackPlugin({
      title: "Development",
      //specify template to build new index html file off of
      template: "./index.html",
    }),
    new Dotenv({
      path: "./.env",
      safe: true,
    }),
  ],
  devServer: {
    // hot: true, //hot module reload
    static: {
      // directory: path.resolve(__dirname),
      publicPath: "/build/",
      //can also set this up in entry, many more config options
    },
    //specify port for dev server launch, default is 8080
    port: 8080,
    //allows us to fetch to from localhost 3000 when we're on 8080
    proxy: {
      //endpoint cannot be route, context required

      "/css": "http://localhost:3000",
      "/signup": "http://localhost:3000",
      "/item": "http://localhost:3000",
      // '/create-item': 'http://localhost:3000',
      "/listings": "http://localhost:3000",
      "/createpost": "http://localhost:3000",
      // '/all-listings': 'http://localhost:3000',
      "/login": "http://localhost:3000",
    },
  },
};

// const path = require('path');
// const HtmlWebpackPlugin = require('html-webpack-plugin');
// module.exports = {
//   entry: path.join(__dirname, './client/index.js'),
//   output: {
//     filename: 'bundle.js',
//     path: path.resolve(__dirname, 'dist'),
//   },
//   mode: 'development',
//   devServer: {
//     static: {
//       publicPath: '/',
//       directory: path.resolve(__dirname, 'dist'),
//     },
//     port: 8080,
//     proxy: {
//       '/assets': 'http://localhost:3000/',
//       // pathRewrite: { '^/assets': ''}, //Brooke's req
//       secure: false
//     }
//   },
//   module: {
//     rules: [
//       {
//         test: /\.jsx?/,
//         exclude: /node_modules/,
//         use: {
//           loader:'babel-loader',
//           options: {
//             presets: ['@babel/env', '@babel/react']
//           }
//         },
//       },
//       {
//         test: /\.s?css/,
//         exclude: '/node_modules/',
//         use: ['style-loader', 'css-loader']
//       },
//       {
//         test: /\.(png|svg|jpg|jpeg|gif)$/i,
//         type: 'asset',
//         use: ['url-loader'],
//       },
//     ]
//   },
//   plugins: [new HtmlWebpackPlugin({title: 'Development', template: './index.html'})],
// };
