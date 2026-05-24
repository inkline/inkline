import { defineComponent } from "@inkline/core";

export default defineComponent({ runtime: "server" }, () => {
  return <div>Server-rendered content</div>;
});
