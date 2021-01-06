const path = require('path');
const webpack = require('webpack');
const exec = require('child_process').exec;
const fs = require('fs');

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
        {
            apply: compiler => {
                compiler.hooks.afterEmit.tap('AfterEmitPlugin', compilation => {
                    let pathToFile = path.join(
                        __dirname,
                        '../dist',
                        'main.js'
                    );

                    let logRows = fs.readFileSync(pathToFile).toString().split('\n');
                
                    logRows.unshift(`// ==UserScript==
// @name         ScoDoc - Remplissage de notes
// @namespace    http://scodoc.iut.u-cergy.fr/
// @version      0.4
// @description  Permet de remplir les notes depuis un fichier .csv ou .json
// @author       IUT CY Paris Université
// @match        http*://scodoc.iut.u-cergy.fr/*
// @grant        none
// ==/UserScript==

/* eslint-disable */
`);
                    fs.writeFileSync(pathToFile, logRows.join('\n'));
                });
            },
        },
    ],
};
