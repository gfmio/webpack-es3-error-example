const path = require("path");
const webpack = require("webpack");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const HardSourceWebpackPlugin = require('hard-source-webpack-plugin');
const { CheckerPlugin } = require("awesome-typescript-loader");

module.exports = {
    entry: "./src/index.ts",
    context: path.join(__dirname),
    output: {
        path: path.join(__dirname, "dist"),
        filename: path.join(".", "assets", "app.js"),
        publicPath: path.join(".", "dist", "assets")
    },
    resolve: {
        extensions: [".html", ".ts", ".tsx", ".js", ".json"]
    },

    module: {
        rules: [{
            test: /.tsx?$/,
            loader: "awesome-typescript-loader",
            options: {
                configFileName: path.join(__dirname, "..", "ts", "tsconfig.client.debug.json"),
            }
        }, {
            enforce: "pre",
            test: /.js$/,
            loader: "source-map-loader"
        }]
    },

    devtool: "source-map",

    plugins: [
        new HardSourceWebpackPlugin(),
        new CheckerPlugin({
            configFileName: path.join(__dirname, "tsconfig.client.debug.json"),
        }),
        new CopyWebpackPlugin([{
            from: './src/index.html',
            to: '.'
        }, {
            from: './src/fixed.html',
            to: '.'
        }]),

    ]
}
