import { defineComponent } from "@inkline/core";
export default defineComponent({ props: { entries: { type: Map } } }, (props) => {
  return <div>{props.entries}</div>;
});
