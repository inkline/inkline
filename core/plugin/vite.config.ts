import { defineConfig } from "vite-plus";

export default defineConfig({
  run: {
    tasks: {
      build: {
        command: "unbuild",
        input: [{ auto: true }, "!dist/**"],
      },
    },
  },
});
