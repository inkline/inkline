// @ts-nocheck
import { createSignal, defineComponent } from "@inkline/core";
export default defineComponent(() => {
  const [pos, setPos] = createSignal({ x: 0, y: 0 });
  return (
    <div onMouseMove={(e) => setPos({ x: e.clientX, y: e.clientY })}>
      <span>
        {pos().x}, {pos().y}
      </span>
    </div>
  );
});
