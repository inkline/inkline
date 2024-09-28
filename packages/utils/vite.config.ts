import { defineConfig } from "vite";
import { configDefaults as vitestConfig } from 'vitest/config';

export default defineConfig({
    test: {
        globals: true,
        environment: 'jsdom',
        include: ["src/**/*.spec.{ts,tsx}"],
        exclude: vitestConfig.exclude
    }
});
