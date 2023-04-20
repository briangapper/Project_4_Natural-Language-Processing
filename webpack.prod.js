const path = require('path');
const webpack = require('webpack');
// Simplifies process of creating HTML files to serve webpack bundles
const HtmlWebpackPlugin = require('html-webpack-plugin');
// Extracts CSS into separate files
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
// Minifies JS files
const TerserPlugin = require('terser-webpack-plugin');
//Minifies CSS files
const CSSMinimizerWebpackPlugin = require('css-minimizer-webpack-plugin');
// Generate service worker for web application
const WorkboxPlugin = require('workbox-webpack-plugin');

module.exports = {
    entry: './src/client/index.js',
    mode: 'production',
    output: {
        path: path.resolve(__dirname, 'dist/prod'),
        libraryTarget: 'var',
        library: 'Client'
    },
    // Minifies CSS files
    optimization: {
        minimizer: [new TerserPlugin({}), new CSSMinimizerWebpackPlugin({})]
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: '/node_modules/',
                loader: 'babel-loader'
            },
            {
                test: /\.scss$/,
                use: [ MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader']
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './src/client/views/index.html',
            filename: './index.html'
        }),
        new MiniCssExtractPlugin({
            filename: '[name].css'
        }),
        new WorkboxPlugin.GenerateSW({})
    ]
};