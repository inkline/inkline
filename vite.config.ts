import { defineConfig } from 'vite';
import { configDefaults } from 'vitest/config';

// https://vitejs.dev/config/
export default defineConfig({
    test: {
        globals: true,
        exclude: [...configDefaults.exclude, 'lib/**']
    }
});
