---
"@inkline/compiler": patch
"@inkline/angular": patch
---

fix(compiler): unwrap Angular element refs to `.nativeElement`

On the Angular target a class-body read of an element ref (`ref.current` in an
effect or event handler) resolved to the `viewChild<ElementRef>` wrapper, so
imperative DOM writes and reads landed on the wrapper instead of the node — a
silent no-op (`el.indeterminate = …`, `el.focus()`, layout measurement). Element
refs now unwrap to `this.ref()?.nativeElement`; component-instance refs
(`<Child ref={x}>`) keep the raw `this.childRef()` signal read, so `ComponentRef`
output is byte-identical. The element-vs-component signal is derived from the
render tree (refs on `Element` nodes) rather than the ref declaration category.
The other six targets already return the raw element and are untouched.
