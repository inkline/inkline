import { createMemo, defineComponent } from "@inkline/core";
export default defineComponent(() => {
  // Deliberately invalid: `a` and `b` read each other, which is the INK0030 circular-memo
  // diagnostic this fixture exists to trigger. TypeScript reports the same cycle as TS7022/TS7024
  // (implicit `any` from a self-referential initializer) — expected, and not a fixture defect.
  // @ts-expect-error -- circular memo dependency, by design
  const a = createMemo(() => b() + 1);
  // @ts-expect-error -- circular memo dependency, by design
  const b = createMemo(() => a() + 1);
  return (
    <div>
      {a()}
      {b()}
    </div>
  );
});
