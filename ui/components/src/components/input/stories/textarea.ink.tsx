import { defineComponent } from "@inkline/core";
import IInput from "../styled/IInput.ink.tsx";

export default defineComponent(() => {
  return <IInput size="md" name="bio" type="textarea" placeholder="Tell us about yourself" />;
});
