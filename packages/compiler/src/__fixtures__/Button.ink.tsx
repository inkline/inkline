// @ts-nocheck
/* eslint-disable */
import { createSignal, defineComponent } from "@inkline/core";

const Button = defineComponent(
  {
    name: "Button",
    props: {
      label: { required: true },
      tone: {},
    },
    events: { click: {} },
  },
  (props: { label: string; tone?: string }) => {
    const [pressed, setPressed] = createSignal(false);
    return (
      <button class={pressed() ? "pressed" : "idle"} onClick={() => setPressed(true)}>
        {props.label}
      </button>
    );
  },
);
