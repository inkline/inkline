// @ts-nocheck
import { defineComponent, useContext } from "@inkline/core";
import { FormContext } from "./ContextProvider";

export default defineComponent(() => {
  const form = useContext(FormContext);

  return (
    <div>
      <span>{form.disabled}</span>
    </div>
  );
});
