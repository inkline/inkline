import { defineComponent, Slot } from "@inkline/core";

export interface InputGroupBaseProps {
  /** Id of the input group element. */
  id?: string;
}

export default defineComponent(
  {
    slots: { default: {} },
  },
  (props: InputGroupBaseProps) => {
    return (
      <div class="input-group" id={props.id}>
        <Slot />
      </div>
    );
  },
);
