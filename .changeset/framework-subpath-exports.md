---
"@inkline/react": minor
"@inkline/vue": minor
"@inkline/svelte": minor
"@inkline/solid": minor
"@inkline/angular": minor
"@inkline/qwik": minor
"@inkline/astro": minor
---

feat: add `./headless` and `./stories` subpath exports

Each framework package now builds three entry points instead of one and exposes them
as subpath exports:

- `@inkline/<fw>` — styled components (the default surface)
- `@inkline/<fw>/headless` — the unstyled `*Base` components
- `@inkline/<fw>/stories` — namespace re-exports of the generated CSF story modules

**BREAKING:** the headless `*Base` components (e.g. `IButtonBase`) are no longer exported
from the package root — import them from `@inkline/<fw>/headless` instead. Styled components
and their imports are unchanged.
