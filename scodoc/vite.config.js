import path from 'path';
import { defineConfig } from 'vite'

import tampermonkeyheader from './plugin.tampermonkeyheader';

const libName = 'scodoc-filling-grades';

export default defineConfig({
    plugins: [tampermonkeyheader({ libName })],
    // root: './src/',
    // publicDir: '../public/',
    // base: './',
    build: {
        // outDir: '../dist',
        emptyOutDir: true,
        minify: true,
        lib: {
            entry: path.resolve(__dirname, 'src/index.js'),
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
    server: {
        open: true,
    },
});
