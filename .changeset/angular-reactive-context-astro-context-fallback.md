---
"@inkline/compiler": minor
"@inkline/angular": patch
"@inkline/astro": patch
---

feat(compiler): reactive Angular context provides + Astro context best-effort

**Angular** could not provide a context value derived from a component's own signal — the value was
emitted into the `@Component` decorator's `providers` array (`useValue: { disabled: disabled() }`),
which is static metadata evaluated at class-definition time with no instance scope, so it threw
`disabled is not defined` on module load. The provided signal is now **lifted into the DI factory**
and exposed via a reactive getter/setter:

```ts
providers: [
  {
    provide: FormContext.key,
    useFactory: () => {
      const disabled = signal(false);
      return {
        get disabled() {
          return disabled();
        },
        set disabled(v) {
          disabled.set(v);
        },
        size: "md",
      };
    },
  },
];
```

The component injects the same object (`formContext = inject(FormContext.key)`) and reads/writes the
signal through it, so the provider and every consumer of the token share one signal. Consumers are
**unchanged** — `{{ form.disabled }}` reads the getter as a plain property and stays reactive.

**Astro** has no client-side context runtime, so a consumed context now falls back to the context's
exported default value as a documented best-effort (`const form = FormContext.defaultValue`) instead
of referencing an undefined binding, and the context definition is exported (`export const
FormContext = { defaultValue: … }`) so consumer modules can import it.
