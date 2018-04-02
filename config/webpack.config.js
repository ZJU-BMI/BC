// import webpack from 'webpack';
// import path from 'path';
// import merge from 'webpack-merge'
const webpack = require('webpack');
const path = require('path')
const merge = require('webpack-merge')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')

const ROOT = path.join(__dirname, "..");
const CLIENT = path.join(ROOT, "client");
const TARGET = process.env.npm_lifecycle_event

const common = {
    entry: {
        app: CLIENT,
    },
    output: {
        filename: '[name].js',
        path: path.join(ROOT, 'public'),
        publicPath: '/assets/static'
    },
    resolve: {
        extensions: ['.js', '.jsx'],
        modules: [
            'node_modules',
        ]
    },
    module: {
        rules: [
            {
                test: /\.jsx?$/,
                include: CLIENT,
                use: 'babel-loader'
            },
            {
                test: /\.css$/,
                use: [
                    'style-loader',
                    'css-loader'
                ]
            },
            {
                test: /\.json$/,
                use: 'json-loader'
            },
            {
                test: /\.(png|jpg|gif|svg)$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            name(file) {
                                if (env === 'development') {
                                    return '[path][name].[ext]';
                                }
                                return '[hash].[ext]';
                            }
                        }
                    }
                ]
            }
        ]
    }
}

const dev = {
    mode: "development",
    devtool: "inline-source-map",
    devServer: {
        contentBasse: './dist'
    }
}

const prod = {
    mode: "production",
    devtool: 'source-map',
    plugins: [
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify('production')
        }),
        new UglifyJsPlugin()
    ]
}

if (TARGET === "start" ||
    TARGET === "test") {
    module.exports = merge(common, dev)
} else if (TARGET === "build:client") {
    module.exports = merge(common, prod)
} else {
    throw new Error(`target ${TARGET} was not specified, please checkout webpack.config.js`)
}