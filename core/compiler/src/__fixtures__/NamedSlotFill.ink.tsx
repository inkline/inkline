import { defineComponent, Slot } from "@inkline/core";

const IButton = defineComponent((props: { label: string }) => {
  return (
    <button>
      <Slot name="icon" />
      <span>{props.label}</span>
    </button>
  );
});

export default defineComponent(() => {
  return (
    <div>
      <IButton label="Star" icon={<span>★</span>} />
      <IButton label="Proxy" icon={<Slot name="icon" />} />
    </div>
  );
});
