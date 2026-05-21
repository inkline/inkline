import { defineCommand } from "citty";

export default defineCommand({
  meta: { name: "compile", description: "Compile components and stories" },
  subCommands: {
    components: () => import("./compile-components.ts").then((m) => m.default),
    stories: () => import("./compile-stories.ts").then((m) => m.default),
  },
});
