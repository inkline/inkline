import { defineDocsCollections } from "@uxfront/docs-theme/content";
import { DOCS_SECTIONS } from "./app/constants/sections.js";

// One-liner content config: the section topology lives in app/constants and the
// package builds the Nuxt Content collections from it. Adding a section there
// (plus a matching content/docs/<folder>/ subtree) is all it takes to grow the
// docs — no package edits.
export default defineDocsCollections([...DOCS_SECTIONS]);
