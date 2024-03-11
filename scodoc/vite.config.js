import path from 'path';

import tampermonkeyheader from './plugin.tampermonkeyheader';

const libName = 'scodoc-filling-grades';

export default {
    plugins: [tampermonkeyheader({ libName })],
    root: 'src/',
    publicDir: '../public/',
    base: './',
    build: {
        outDir: '../dist',
        emptyOutDir: true,
        minify: true,
        lib: {
            entry: path.resolve(__dirname, 'src/main.js'),
            name: 'ScodocFillingGrades',
            fileName: libName,
            formats: ['umd'],
        },
        rollupOptions: {
            output: {
                entryFileNames: `${libName}.js`,
            },
        },
    },
};
