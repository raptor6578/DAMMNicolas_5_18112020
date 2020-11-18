const path = require('path');
const Dotenv = require('dotenv-webpack');

module.exports = {
    mode: "production",
    entry: {
        polyfill: "babel-polyfill",
        app: "./src/index.js"
    },
    output: {
        filename: "[name].bundle.js",
        path: path.resolve(__dirname, "dist"),
        publicPath: "dist"
    },
    devServer: {
        writeToDisk: true,
        watchContentBase: true
    },
    module: {
        rules: [
            {
                test: /\.s[ac]ss$/i,
                use: [
                    // Creates `style` nodes from JS strings
                    "style-loader",
                    // Translates CSS into CommonJS
                    "css-loader",
                    // Compiles Sass to CSS
                    "sass-loader",
                ],
            },
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader",
                    options: {
                        presets: ["@babel/preset-env"]
                    }
                }
            }
        ],
    },
    plugins: [
        new Dotenv()
    ]
};