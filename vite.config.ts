import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
import viteTsconfigPaths from 'vite-tsconfig-paths';

import package_ from './package.json';

const environmentName = process.env.npm_package_name;

if (!environmentName) {
    throw new Error('Missing package name in environment variables. Vue CLI should set this.');
}

const name = environmentName.split('/').pop();

export default defineConfig({
    plugins: [react(), viteTsconfigPaths()],
    build: {
        sourcemap: true,
        rollupOptions: {
            external: Object.keys(package_.peerDependencies || {}),
            output: {
                format: 'iife',
                assetFileNames: `${name}.[hash].[extname]`,
                chunkFileNames: `${name}.[hash].chunk.js`,
                entryFileNames: `${name}.min.js`,
                globals: {
                    react: 'React',
                    'react-dom': 'ReactDOM',
                    '@mui/material': 'MaterialUI',
                    '@emotion/react': 'emotionReact',
                    '@emotion/styled': 'emotionStyled',
                },
            },
        },
        outDir: 'dist',
    },
});
