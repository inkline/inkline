import { defineConfig, configDefaults as vitestConfig } from "vitest/config";

export default defineConfig({
    test: {
        globals: true,
        include: ["src/**/*.spec.{ts,tsx}"],
        exclude: vitestConfig.exclude
    }
});
