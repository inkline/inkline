import { defineCommand } from "citty";

export default defineCommand({
  meta: { name: "add", description: "Add a component to your project" },
  args: {
    component: { type: "positional", description: "Component name", required: true },
  },
  run() {
    console.log("inkline add is not yet implemented.");
  },
});
