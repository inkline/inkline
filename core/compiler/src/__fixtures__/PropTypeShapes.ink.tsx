import { defineComponent } from "@inkline/core";
export default defineComponent(
  {
    props: {
      size: { type: Number },
      label: { type: String, required: true },
      when: { type: Date },
      count: { type: Number, required: true, default: 0 },
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
