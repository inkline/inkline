import { defineComponent } from "@inkline/core";
import IInput from "../styled/IInput.ink.tsx";

export default defineComponent(() => {
  return (
    <IInput
      size="md"
      name="site"
      type="text"
      placeholder="example"
      prepend={<>https://</>}
      append={<>.com</>}
    />
  );
});
