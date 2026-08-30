import { defineComponent } from "@inkline/core";
export default defineComponent({ props: { when: Date, size: Number } }, (props) => {
  return <div>{props.size}</div>;
});
