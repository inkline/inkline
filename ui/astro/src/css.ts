// `vp pack` (the astro build) never runs Vite plugins, so the styleframe plugin
// cannot emit the stylesheet there the way it does for the other frameworks. This
// is the entry of a CSS-only `vp build` that runs first; `pack.copy` lifts the
// extracted stylesheet into `dist/index.css`, the file `exports["./css"]` names.
import "virtual:styleframe.css";
