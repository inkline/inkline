# Grid
Inkline's grid system is modelled as a 12 columns layout built using flexbox, with equally divided columns, 
separated by a small gutter. We've made sure to use percentage widths, so that it is usable at any nesting level. { .lead }

The grid system is defined using `<i-container>`, `<i-row>` and `<i-column>` components, with each one having specific responsive modifiers. Here's how it works:

- First, we define a row with a set of columns inside of it.
- Your content elements should be placed directly in a `<i-column>`, and only `<i-column>` should be placed directly inside an `<i-row>` component
- The column width takes a value of 1-12 at each responsive breakpoint (`xs`, `sm`, `md`, `lg`, `xlg`).
- If the sum of `column` widths in a row is more than 12, then the overflowing column will start on a new line.
