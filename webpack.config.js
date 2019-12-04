import path from 'path';
import HTMLWebpackPlugin from 'html-webpack-plugin';
import webpack from 'webpack';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import { CleanWebpackPlugin } from 'clean-webpack-plugin';

export default {
    entry: './js/src/main.js',
    output: {
        path: path.resolve(__dirname, 'build'),
        filename: '[name].[hash].js'
    },
    module: {
        rules: [
            {
                test: /\.(m?js|jsx)$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader'
                }
            },
            {
                test: /.css$/,
                use: [
                    'style-loader',
                    {
                        loader: MiniCssExtractPlugin.loader,
                        options: { hmr: true}
                    },
                    'css-loader'
                ]
            }
        ]
    },
    plugins: [
        new HTMLWebpackPlugin({
            template: './index.html',
            inject: false,
            favicon: './favicon.ico',
            filename: './index.html',
            hash: false
        }),
        new webpack.HotModuleReplacementPlugin(),
        new MiniCssExtractPlugin({
            filename: 'main.[contenthash].css'
        }),
        new CleanWebpackPlugin()
    ],
    devServer: {
        contentBase: './build/',
        hot: true
    }
}