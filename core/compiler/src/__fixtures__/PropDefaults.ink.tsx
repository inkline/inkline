import { defineComponent } from "@inkline/core";
export default defineComponent({ props: { color: "blue", size: Number } }, (props) => {
  return <div style={`color: ${props.color}`}>{props.size}</div>;
});
