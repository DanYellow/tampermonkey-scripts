import fs from 'fs';
import { version } from './package.json';
import path from 'path';

export default ({ libName }) => {
    return {
        name: 'Add Tampermonkey header',
        closeBundle: () => {
            let today = new Date();
            const dd = String(today.getDate()).padStart(2, '0');
            const mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
            const yyyy = today.getFullYear();
            today = dd + '/' + mm + '/' + yyyy;
            const pathToLib = path.join(__dirname, 'dist', `${libName}.js`);
            const pathToTxtFile = path.join(
                __dirname,
                'dist',
                `${libName}.js.txt`
            );
            const logRows = fs.readFileSync(pathToLib).toString().split('\n');
            logRows.unshift(`// ==UserScript==
                // @name         ScoDoc - Remplissage de notes
                // @namespace    http://scodoc.iut.cyu.fr/
                // @version      ${version}
                // @description  Permet de remplir les notes depuis un fichier .csv ou .json
                // @author       IUT CY Paris Université
                // @match        http*://scodoc.iut.cyu.fr/*
                // @grant        none
                // @date      ${today}
                // ==/UserScript==
                /* eslint-disable */
                `);
            fs.writeFileSync(pathToLib, logRows.join('\n'));
            fs.copyFile(pathToLib, pathToTxtFile, () => {});
        },
    };
};
