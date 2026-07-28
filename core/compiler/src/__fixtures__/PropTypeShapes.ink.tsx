import { defineComponent } from "@inkline/core";
export default defineComponent(
  {
    props: {
      size: { type: Number },
      label: { type: String, required: true },
      when: { type: Date },
      count: { type: Number, required: true, default: 0 },
      // Not a shape — an object literal used as a default, alongside the shapes above.
      cfg: { a: 1 },
    },
  },
  (props) => {
    return (
      <div>
        {props.label}
        {props.size}
        {props.count}
      </div>
    );
  },
);
