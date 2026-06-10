import { defineComponent, Slot } from "@inkline/core";

const Box = defineComponent({ slots: { default: {} } }, () => (
  <div class="box">
    <Slot />
  </div>
));

// A component instance with multiple default-slot children — these must project as direct siblings,
// not collapse into a wrapper (e.g. Vue must not emit a bare <template>).
export default defineComponent(() => (
  <Box>
    <span>a</span>
    <span>b</span>
  </Box>
));
