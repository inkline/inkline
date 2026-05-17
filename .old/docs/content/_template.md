You are an expert technical writer for a Vue.js UI library called Inkline. Write a Markdown documentation page for the `{{ComponentName}}` component following the exact structure below. Make sure to:

1. Include front matter with:
    - `title: {{ComponentName}} - Inkline`
    - `description: {{Description}}`

2. Use an H1 heading matching the component name (e.g., `# {{ComponentName}}`).

3. Provide an **Overview** section describing what the component does, including:
    - A short descriptive paragraph.
    - Bullet-list scenarios describing how and when the component is used.

4. Include an **Import** section with:
   ```ts
   import { {{ComponentName}} } from 'inkline/{{component-package}}';
   ```
And a `::DocsImportNotice::` to indicate important usage notes.

5. Provide a **Usage** section with multiple sub-sections (e.g., Basic Usage, Variants, etc.). For each sub-section:
    - Write a guide on using the props that the example refers to.
    - Write a brief explanation/caption of what the example does after the tabs.
    - Use `::DocsComponentDemo{ package="{{component-package}}" name="{{demo-name}}" }::` markers to indicate demo components.
    - Use HTML comments for code references:
      ```html
      <!-- :DocsCode{ package="@inkline/component-{{component-package}}" file="examples/{{demo-file}}.vue" } -->
      ```

6. Create a **Props** section referencing the Inkline component props:
   ```
   ::DocsComponentProps{ package="{{component-package}}" component="{{ComponentName}}" }
   ::
   ```

7. If the component emits any events, create an **Events** section:
   ```
   ::DocsComponentEvents{ package="{{component-package}}" component="{{ComponentName}}" }
   ::
   ```
   Otherwise, mention it does not emit custom events.

8. Provide a **Slots** section:
   ```
   ::DocsComponentSlots{ package="{{component-package}}" component="{{ComponentName}}" }
   ::
   ```

9. Write an **Accessibility** section with bullet points for ARIA roles, keyboard navigation, and additional guidelines. Focus on best practices.

10. Write a **Best Practices** section with tips on using the component effectively.

Use the example structure below as a reference. Update it with the specific examples, text, and sub-sections for the `{{ComponentName}}` component:

---
title: {{ComponentName}} - Inkline
description: Documentation and examples for the {{ComponentName}} component, used for displaying numerical indicators, statuses, or labels.
---

# {{ComponentName}}

Documentation and examples for the {{ComponentName}} component, used for displaying numerical indicators, statuses, or labels.

## Overview

A `{{ComponentName}}` is a small numerical indicator, label, or status descriptor often displayed near another component or piece of text to provide quick information, such as unread messages count, a status label, or a category tag.

The `{{ComponentName}}` component in Inkline is versatile and can be easily customized to fit various use cases:
- *Standalone usage:* Display a `{{ComponentName}}` on its own to indicate a status or identifier. For example, “Beta” next to a heading, or a read/unread status.
- *In combination with other components:* Place a `{{ComponentName}}` near buttons, icons, or list items to show a count (e.g., a “shopping cart” icon with a `{{ComponentName}}` indicating the number of items).
- *Conditional or dynamic display:* Show a `{{ComponentName}}` only if the count or status meets certain criteria (e.g., hide the badge if count is zero, or display a “New” badge if a resource was recently created).
- *Form integration (if applicable):* Typically, badges are not directly used in forms. However, you could imagine using a badge to show validation states or statuses within a form if desired.

## Import

```ts
import { {{ComponentName}} } from 'inkline/badge';
```

::DocsImportNotice
::

## Usage

### Basic Usage

In its simplest form, the `{{ComponentName}}` component is used...

::DocsTabs
#preview
:DocsComponentDemo{ package="{{component-package}}" name="basic" }
#code
<!-- :DocsCode{ package="@inkline/component-{{component-package}}" file="examples/basic.vue" } -->
::

*This example renders a `{{ComponentName}}` with the default styling and the text “{{ComponentName}}”.*

### Example: Color Variants

Using the `color` prop, you can quickly style the `{{ComponentName}}` in different thematic contexts.

::DocsTabs
#preview
:DocsComponentDemo{ package="{{component-package}}" name="color-variants" }
#code
<!-- :DocsCode{ package="@inkline/component-{{component-package}}" file="examples/color-variants.vue" } -->
::

*In this example, the `{{ComponentName}}` is rendered in various different color variants.*

### Example: Size Variants

Using the `size` prop, you can quickly style the `{{ComponentName}}` in different sizes.

::DocsTabs
#preview
:DocsComponentDemo{ package="{{component-package}}" name="size-variants" }
#code
<!-- :DocsCode{ package="@inkline/component-{{component-package}}" file="examples/size-variants.vue" } -->
::

*This example demonstrates small, medium, and large `{{ComponentName}}` variations.*

### Example: [Other Example]

[Other Example Description]

::DocsTabsYou are an expert technical writer for a Vue.js UI library called Inkline. Write a Markdown documentation page for the `{{ComponentName}}` component following the exact structure below. Make sure to:

1. Include front matter with:
    - `title: {{ComponentName}} - Inkline`
    - `description: {{Description}}`

2. Use an H1 heading matching the component name (e.g., `# {{ComponentName}}`).

3. Provide an **Overview** section describing what the component does, including:
    - A short descriptive paragraph.
    - Bullet-list scenarios describing how and when the component is used.

4. Include an **Import** section with:
   ```ts
   import { {{ComponentName}} } from 'inkline/{{component-package}}';
   ```
And a `::DocsImportNotice::` to indicate important usage notes.

5. Provide a **Usage** section with multiple sub-sections (e.g., Basic Usage, Variants, etc.). For each sub-section:
    - Write a guide on using the props that the example refers to.
    - Write a brief explanation/caption of what the example does after the tabs.
    - Use `::DocsComponentDemo{ package="@inkline/component-{{component-package}}" name="examples/{{demo-file}}.vue" }::` markers to indicate demo components.
    - Use HTML comments for code references:
      ```html
      <!-- :DocsCode{ package="@inkline/component-{{component-package}}" file="examples/{{demo-file}}.vue" } -->
      ```

6. Create a **Props** section referencing the Inkline component props:
   ```
   ::DocsComponentProps{ package="@inkline/component-{{component-package}}" component="{{ComponentName}}" }
   ::
   ```

7. If the component emits any events, create an **Events** section:
   ```
   ::DocsComponentEvents{ package="@inkline/component-{{component-package}}" component="{{ComponentName}}" }
   ::
   ```
   Otherwise, mention it does not emit custom events.

8. Provide a **Slots** section:
   ```
   ::DocsComponentSlots{ package="@inkline/component-{{component-package}}" component="{{ComponentName}}" }
   ::
   ```
   
9. Provide a **Design Tokens** section:
   ```
   ::DocsComponentDesignTokens{ package="@inkline/component-{{component-package}}" component="{{ComponentName}}" }
   ::
   ```

10. Write an **Accessibility** section with bullet points for ARIA roles, keyboard navigation, and additional guidelines. Focus on best practices.

11. Write a **Best Practices** section with tips on using the component effectively.

Use the example structure below as a reference. Update it with the specific examples, text, and sub-sections for the `{{ComponentName}}` component:

---
title: {{ComponentName}} - Inkline
description: Documentation and examples for the {{ComponentName}} component, used for displaying numerical indicators, statuses, or labels.
---

# {{ComponentName}}

Documentation and examples for the {{ComponentName}} component, used for displaying numerical indicators, statuses, or labels.

## Overview

A `{{ComponentName}}` is a small numerical indicator, label, or status descriptor often displayed near another component or piece of text to provide quick information, such as unread messages count, a status label, or a category tag.

The `{{ComponentName}}` component in Inkline is versatile and can be easily customized to fit various use cases:
- *Standalone usage:* Display a `{{ComponentName}}` on its own to indicate a status or identifier. For example, “Beta” next to a heading, or a read/unread status.
- *In combination with other components:* Place a `{{ComponentName}}` near buttons, icons, or list items to show a count (e.g., a “shopping cart” icon with a `{{ComponentName}}` indicating the number of items).
- *Conditional or dynamic display:* Show a `{{ComponentName}}` only if the count or status meets certain criteria (e.g., hide the badge if count is zero, or display a “New” badge if a resource was recently created).
- *Form integration (if applicable):* Typically, badges are not directly used in forms. However, you could imagine using a badge to show validation states or statuses within a form if desired.

## Import

```ts
import { {{ComponentName}} } from 'inkline/badge';
```

::DocsImportNotice
::

## Usage

### Basic Usage

In its simplest form, the `{{ComponentName}}` component is used...

::DocsTabs
#preview
:DocsComponentDemo{ package="@inkline/component-{{component-package}}" name="examples/basic.vue" }
#code
<!-- :DocsCode{ package="@inkline/component-{{component-package}}" file="examples/basic.vue" } -->
::

*This example renders a `{{ComponentName}}` with the default styling and the text “{{ComponentName}}”.*

### Example: Color Variants

Using the `color` prop, you can quickly style the `{{ComponentName}}` in different thematic contexts.

::DocsTabs
#preview
:DocsComponentDemo{ package="@inkline/component-{{component-package}}" name="examples/color-variants.vue" }
#code
<!-- :DocsCode{ package="@inkline/component-{{component-package}}" file="examples/color-variants.vue" } -->
::

*In this example, the `{{ComponentName}}` is rendered in various different color variants.*

### Example: Size Variants

Using the `size` prop, you can quickly style the `{{ComponentName}}` in different sizes.

::DocsTabs
#preview
:DocsComponentDemo{ package="@inkline/component-{{component-package}}" name="examples/size-variants.vue" }
#code
<!-- :DocsCode{ package="@inkline/component-{{component-package}}" file="examples/size-variants.vue" } -->
::

*This example demonstrates small, medium, and large `{{ComponentName}}` variations.*

### Example: Other Example

Other Example Description

::DocsTabs
#preview
:DocsComponentDemo{ package="@inkline/component-{{component-package}}" name="examples/[other-example].vue" }
#code
<!-- :DocsCode{ package="@inkline/component-{{component-package}}" file="examples/[other-example].vue" } -->
::

*Other Example Caption*

## Props

::DocsCard{ title="{{ComponentName}} Props" }
Below is an outline of available props for the `{{ComponentName}}` component.

::DocsComponentProps{ package="@inkline/component-{{component-package}}" component="{{ComponentName}}" }
::
::

## Events

::DocsCard{ title="{{ComponentName}} Events" }
The `{{ComponentName}}` component does not emit any custom events. However, you can bind native events like `@click` to make the `{{ComponentName}}` interactive.

::DocsComponentEvents{ package="@inkline/component-{{component-package}}" component="{{ComponentName}}" }
::
::

## Slots

::DocsCard{ title="{{ComponentName}} Slots" }
Below is an outline of available slots for the `{{ComponentName}}` component.

::DocsComponentSlots{ package="@inkline/component-{{component-package}}" component="{{ComponentName}}" }
::
::

## Design Tokens

::DocsCard{ title="{{ComponentName}} Design Tokens" }
Below is an outline of available design tokens for the `{{ComponentName}}` component.

::DocsComponentDesignTokens{ package="@inkline/component-{{component-package}}" component="{{ComponentName}}" }
::
::

## Accessibility

By default, Inkline aims to ensure `{{ComponentName}}` components are accessible out of the box. However, confirm your usage aligns with these best practices and any app-specific guidelines. Here are some accessibility considerations for the `{{ComponentName}}` component:

**ARIA roles/attributes:**

- If the `{{ComponentName}}` represents a status, you could consider using `role="status"` or `aria-label` to clarify its meaning for screen readers.
- If the `{{ComponentName}}` is purely decorative, ensure it’s marked appropriately so that assistive technologies don’t misinterpret it as essential content.

**Keyboard navigation:**

- Generally, `{{ComponentName}}` components are non-interactive labels. However, if your `{{ComponentName}}` is clickable or has an interactive role, ensure that it’s focusable (e.g. add `tabindex="0"`) and can be activated via **Enter** or **Space** keys.

**Additional guidelines:**

- Provide text or an accessible label if the `{{ComponentName}}` uses an icon or relies on color alone to convey meaning. This is particularly relevant if the `{{ComponentName}}` shows a status color (e.g., “error” in red). Offer a textual representation for color-blind or screen reader users.

## Best Practices

**Don’t overload the `{{ComponentName}}` with too much text:**
- Keep `{{ComponentName}}` components concise. If you need more context, consider a tooltip or a label.

**Use color intentionally:**
- Rely on meaningful color usage to reflect status or category. For better accessibility, pair color with text (e.g., “Error” instead of just a red `{{ComponentName}}`).

**Link to content if needed:**
- If the `{{ComponentName}}` represents a navigable item (like a filter or category tag), ensure it is keyboard accessible and has the correct role or is rendered as a clickable element.

**Combine with icons judiciously:**
- While a number or short label is most common, an icon can help convey meaning (e.g., a check icon for “confirmed”).

**Respect theming:**
- Try to stick to the color variants provided by Inkline to maintain a consistent design system. Avoid manual color overrides unless necessary for your branding.

**Performance considerations:**
- A `{{ComponentName}}` is lightweight, so performance is rarely a concern. However, if you update the `{{ComponentName}}` count frequently (e.g., real-time updates), ensure it’s efficient (e.g., use watchers or computed properties sparingly).
