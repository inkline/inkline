import { defineConfig } from 'vite';
import inspect from 'vite-plugin-inspect';
import { inkline } from '../src/vite';

export default defineConfig({
    plugins: [
        inspect(),
        inkline()
    ]
});
