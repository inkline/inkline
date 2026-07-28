---
"@inkline/compiler": minor
---

Report discarded JSX spread attributes with a new `error` diagnostic, `INK0071`. `<button {...props} />` was previously dropped by the parser without any message, so the component compiled successfully and silently lost every spread attribute. The diagnostic names the file, line, and column of each spread, and its help text points at the workaround: enumerate the attributes explicitly. Spread support itself remains out of scope for v0 and is now listed under the compiler's v0 limitations.
