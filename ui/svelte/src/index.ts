// Pulls the compiled recipe atomics into the build graph so Vite extracts them to
// `dist/index.css`, the file `exports["./css"]` points at. Lib mode never injects
// the stylesheet into the JS, so importing the package stays style-free.
import "virtual:styleframe.css";

export * from "../.inkline/index.ts";
