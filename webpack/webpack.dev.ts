import path from "path";
import webpack from "webpack";
import merge from "webpack-merge";
import common from "./webpack";
const ErrorOverlayPlugin = require('error-overlay-webpack-plugin')
const config: webpack.Configuration = merge(common, {
    mode: "development",
    devtool: "inline-source-map",
    devServer: {
        contentBase: "../dist",
        host: "0.0.0.0",
        // 这个的作用是让webpack安静点
        stats:'errors-warnings'
    },
    plugins: [
        new ErrorOverlayPlugin()
    ],
});

export default config;