const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')

module.exports = {
    entry: './src/client/index.js',
    mode: 'development',
    devtool: 'source-map',
    // Last 2 lines set the output target type and exports the built module as a variable to be used in the browser environment.
    // In short, it ensures communication between files.  
    output: {
        path: path.resolve(__dirname, 'dist/dev'),
        libraryTarget: 'var',
        library: 'Client'
    },
    devServer: {
        port: 8000
    },
    // stats: 'verbose',
    module: {
         rules: [
            {
                 test: /\.js$/,
                 exclude: '/node_modules/',
                 loader: 'babel-loader'
            },
            {
                test: /\.scss$/,
                use: ['style-loader', 'css-loader', 'sass-loader']
            }
         ]
     },
     plugins: [
          new HtmlWebpackPlugin({
              template: './src/client/views/index.html',
              filename: './index.html'
          }),
          new CleanWebpackPlugin({
            // Simulate the removal of files
            dry: true,
            // Write Logs to Console
            verbose: true,
            // Automatically remove all unused webpack assets on rebuild
            cleanStaleWebpackAssets: true,
            protectWebpackAssets: false
          })
    ]
}