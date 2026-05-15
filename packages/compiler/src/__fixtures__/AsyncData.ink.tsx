// @ts-nocheck
import { createResource, defineComponent } from "@inkline/core";

export default defineComponent(() => {
  const [data, { loading, error }] = createResource(async () => {
    const res = await fetch("/api/items");
    return res.json();
  });

  return (
    <div>
      <span>{loading ? "Loading..." : JSON.stringify(data)}</span>
    </div>
  );
});
