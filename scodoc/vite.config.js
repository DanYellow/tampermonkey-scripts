import path from 'path';
import { defineConfig } from 'vite'

import tampermonkeyheader from './plugin.tampermonkeyheader';

const libName = 'scodoc-filling-grades';

export default defineConfig({
    plugins: [tampermonkeyheader({ libName })],
    // root: './localsite2',
    // publicDir: '../public/',
    // base: './src',
    build: {
        // outDir: '../dist',
        emptyOutDir: true,
        minify: false,
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
