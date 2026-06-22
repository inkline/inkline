---
"@inkline/compiler": minor
"@inkline/angular": minor
"@inkline/test-utils": patch
---

feat(compiler): collapse styled-over-headless into one zero-wrapper Angular component

Builds on the headless host-extraction: a styled component marked `meta.headless` whose entire render
is a single headless child now **collapses** onto that child's host element on Angular. The compiler
parses the imported headless sibling (a cross-file **headless registry** on the codegen context) and
inlines its root's host bindings + template into one attribute-selector `@Component`, merging the
styled recipe class and tagging the host with the child's own selector:

```
<button ink-button>  →  <button ink-button ink-button-base class="button button--color-primary …">…</button>
```

The element-selector wrapper (`<ink-button>` → `display: contents`) is still emitted (dual selector),
so existing usage is unchanged. Applied to **Button, Badge, and FieldGroup** (`meta.headless` added to
their headless + styled sources). Only the Angular output changes — the other six targets are
byte-identical. A styled root whose child can't be host-extracted (non-element/fragment root) warns
(INK0111) and keeps only the wrapper.

`@inkline/test-utils`' Angular SSR harness now mounts attribute-selector components (`tag[attr]` → a
real `<tag attr>` host) and can select a named component export, and registers signal-input metadata
for every class in a multi-class file.
