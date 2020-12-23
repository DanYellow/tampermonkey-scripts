const path = require('path');
const webpack = require('webpack');

module.exports = {
    entry: './src/main.js',
    output: {
        filename: 'main.js',
        path: path.resolve(__dirname, '../dist'),
    },
    module: {
        rules: [
            {
                test: /\.html$/i,
                loader: 'html-loader',
            },
            {
                oneOf: [
                    {
                        test: /\.(js|jsx)$/,
                        loader: require.resolve('babel-loader'),
                        exclude: /(node_modules)/,
                        options: {
                            cacheDirectory: false,
                        },
                    },
                ],
            },
        ],
    },
    optimization: {
        minimize: true,
    },
    plugins: [
        new webpack.BannerPlugin(`
          // ==UserScript==
          // @name         ScoDoc - Remplissage de notes
          // @namespace    http://scodoc.iut.u-cergy.fr/
          // @version      0.3
          // @description  Permet de remplir les notes depuis un fichier .csv ou .json
          // @author       IUT CY Paris Université
          // @match        http*://scodoc.iut.u-cergy.fr/*
          // @grant        none
          // ==/UserScript==
      `),
    ],
};
