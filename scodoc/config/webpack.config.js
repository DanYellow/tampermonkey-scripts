const path = require('path');
const package = require('../package.json');
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
        minimize: false,
    },
    plugins: [
        {
            apply: compiler => {
                compiler.hooks.afterEmit.tap('AfterEmitPlugin', compilation => {
                    let today = new Date();
                    const dd = String(today.getDate()).padStart(2, '0');
                    const mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
                    const yyyy = today.getFullYear();
                    today = dd + '/' + mm + '/' + yyyy;


                    const pathToFile = path.join(
                        __dirname,
                        '../dist',
                        'main.js'
                    );

                    const pathToTxtFile = path.join(
                        __dirname,
                        '../dist',
                        'main.js.txt'
                    );

                    const logRows = fs
                        .readFileSync(pathToFile)
                        .toString()
                        .split('\n');

                    logRows.unshift(`// ==UserScript==
// @name         ScoDoc - Remplissage de notes
// @namespace    http://scodoc.iut.u-cergy.fr/
// @version      ${package.version}
// @description  Permet de remplir les notes depuis un fichier .csv ou .json
// @author       IUT CY Paris Université
// @match        http*://scodoc.iut.u-cergy.fr/*
// @grant        none
// @date      ${today}
// ==/UserScript==

/* eslint-disable */
`);
                    fs.writeFileSync(pathToFile, logRows.join('\n'));
                    fs.copyFile(pathToFile, pathToTxtFile, () => {});
                });
            },
        },
    ],
};
