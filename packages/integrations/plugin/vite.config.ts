import { resolve } from 'path';
import { defineConfig } from 'vite';
import dts from 'vite-plugin-dts';

export default defineConfig({
    plugins: [dts({ rollupTypes: true })],
    build: {
        ssr: true,
        lib: {
            entry: [resolve(__dirname, 'src', 'index.ts'), resolve(__dirname, 'src', 'nuxt.ts')],
            name: 'InklinePlugin',
            formats: ['es', 'cjs'],
            fileName: 'plugin'
        }
    }
});
