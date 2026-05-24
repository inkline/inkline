import { defineComponent } from "@inkline/core";
export default defineComponent((props: { title: string; children?: unknown }) => {
  return (
    <div class="card">
      <h2>{props.title}</h2>
      <div class="card-body">{props.children}</div>
    </div>
  );
});
