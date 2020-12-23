const html = require('@rollup/plugin-html');
const babel = require('@rollup/plugin-babel').babel;
import commonjs from '@rollup/plugin-commonjs';
import pug from 'rollup-plugin-pug-html';


const fs = require('fs')
const path = require('path')

const css = fs.readFileSync(path.resolve(__dirname, './csv2json.js'), 'utf8')

export default {
    input: 'src/main.js',
    output: {
        file: 'dist/bundle.js',
        format: 'iife',
        // intro: css
    },
    plugins: [
        html({ include: '**/*.html' }),
        babel({ babelHelpers: 'bundled' }),
        pug({
            // You can use native pug options as well.
            pretty: true,
            // You can also pass context for the Pug variables:
            context: { name: 'World' },
        }),
        commonjs({
            namedExports: {
                'node_modules/csvjson-json2csv/json2csv.js' : ['json2csv'],
            }
        })
    ], 
};
