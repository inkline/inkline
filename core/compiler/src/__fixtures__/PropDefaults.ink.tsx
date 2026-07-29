import { defineComponent } from "@inkline/core";
// `props` in the options object declares props and their defaults for the compiler; it is not used
// to infer the setup parameter's type, so the shape is stated explicitly as the type argument.
export default defineComponent<{ color?: string; size?: number }>(
  { props: { color: "blue", size: Number } },
  (props) => {
    return <div style={`color: ${props.color}`}>{props.size}</div>;
  },
);
