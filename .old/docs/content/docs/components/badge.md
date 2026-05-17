---
title: Badge - Inkline
description: Documentation and examples for the Badge component, used for displaying numerical indicators, statuses, or labels.
---

# Badge

Documentation and examples for the Badge component, used for displaying numerical indicators, statuses, or labels.

## Overview 

A `Badge` is a small numerical indicator, label, or status descriptor often displayed near another component or piece of text to provide quick information, such as unread messages count, a status label, or a category tag. 

The `Badge` component in Inkline is versatile and can be easily customized to fit various use cases:
- *Standalone usage:* Display a `Badge` on its own to indicate a status or identifier. For example, “Beta” next to a heading, or a read/unread status.
- *In combination with other components:* Place a `Badge` near buttons, icons, or list items to show a count (e.g., a “shopping cart” icon with a `Badge` indicating the number of items).
- *Conditional or dynamic display:* Show a `Badge` only if the count or status meets certain criteria (e.g., hide the badge if count is zero, or display a “New” badge if a resource was recently created).
- *Form integration (if applicable):* Typically, badges are not directly used in forms. However, you could imagine using a badge to show validation states or statuses within a form if desired.

## Import

```ts
import { Badge } from 'inkline/badge';
```

:DocsImportNotice

## Usage

### Basic Usage

In its simplest form, the `Badge` component is used to show a static label or count. By default, it uses the `light` or `dark` color variant, depending on the user's system color mode.

::DocsTabs
#preview 
:DocsComponentDemo{ package="@inkline/component-badge" file="examples/basic.vue" }
#code
<!-- :DocsCode{ package="@inkline/component-badge" file="examples/basic.vue" } -->
::

*This example renders a badge with the default styling and the text “Badge”.*

### Example: Color Variants

Using the `color` prop, you can quickly style the badge in different thematic contexts.

::DocsTabs
#preview
:DocsComponentDemo{ package="@inkline/component-badge" file="examples/color-variants.vue" }
#code
<!-- :DocsCode{ package="@inkline/component-badge" file="examples/color-variants.vue" } -->
::

*In this example, the `Badge` is rendered in various different color variants.*

### Example: Size Variants

Using the `size` prop, you can quickly style the badge in different sizes. By setting the value to `inherit`, the `Badge` will inherit the font size of the element it is used in.

::DocsTabs
#preview
:DocsComponentDemo{ package="@inkline/component-badge" file="examples/size-variants.vue" }
#code
<!-- :DocsCode{ package="@inkline/component-badge" file="examples/size-variants.vue" } -->
::

*This example demonstrates inherit, small, medium, and large badge variations.*

### Example: Heading with Badge

A common use case for badges is to show a status or category label next to a heading or title. Here’s how you might use a `Badge` in a heading:

::DocsTabs
#preview
:DocsComponentDemo{ package="@inkline/component-badge" file="examples/heading" direction="column.vue" }
#code
<!-- :DocsCode{ package="@inkline/component-badge" file="examples/heading.vue" } -->
::

*This example shows a headings with badges indicating a status. Badges use the `inherit` size property.*

### Example: Pill Style

Setting the `pill` prop modifies the badge’s border radius to create a pill shape. This variation is a popular choice for tags and labels.

::DocsTabs
#preview
:DocsComponentDemo{ package="@inkline/component-badge" file="examples/pill.vue" }
#code
<!-- :DocsCode{ package="@inkline/component-badge" file="examples/pill.vue" } -->
::

*This example shows a badge using the pill variant.*

## Props

::DocsCard{ title="Badge Props" }
Below is an outline of available props for the `Badge` component.

::DocsComponentProps{ package="@inkline/component-badge" component="Badge" }
::
::

## Events

::DocsCard{ title="Badge Events" }
The `Badge` component does not emit any custom events. However, you can bind native events like `@click` to make the badge interactive.
::

## Slots

::DocsCard{ title="Badge Slots" }
Below is an outline of available slots for the `Badge` component.

::DocsComponentSlots{ package="@inkline/component-badge" component="Badge" }
::
::

## Design Tokens

::DocsCard{ title="Badge Design Tokens" }
Below is an outline of available design tokens for the `Badge` component.

::DocsComponentDesignTokens{ package="@inkline/component-badge" component="Badge" }
::
::

## Accessibility

By default, Inkline aims to ensure `Badge` components are accessible out of the box. However, confirm your usage aligns with these best practices and any app-specific guidelines. Here are some accessibility considerations for the `Badge` component:

**ARIA roles/attributes:**

- If the badge represents a status, you could consider using `role="status"` or `aria-label` to clarify its meaning for screen readers.
- If the badge is purely decorative, ensure it’s marked appropriately so that assistive technologies don’t misinterpret it as essential content.

**Keyboard navigation:**

- Generally, badges are non-interactive labels. However, if your `Badge` is clickable or has an interactive role, ensure that it’s focusable (e.g. add `tabindex="0"`) and can be activated via **Enter** or **Space** keys.

**Additional guidelines:**

- Provide text or an accessible label if the `Badge` uses an icon or relies on color alone to convey meaning. This is particularly relevant if the badge shows a status color (e.g., “error” in red). Offer a textual representation for color-blind or screen reader users.

## Best Practices

**Don’t overload the badge with too much text:** 
- Keep badges concise. If you need more context, consider a tooltip or a label.

**Use color intentionally:** 
- Rely on meaningful color usage to reflect status or category. For better accessibility, pair color with text (e.g., “Error” instead of just a red badge).

**Link to content if needed:** 
- If the `Badge` represents a navigable item (like a filter or category tag), ensure it is keyboard accessible and has the correct role or is rendered as a clickable element.

**Combine with icons judiciously:** 
- While a number or short label is most common, an icon can help convey meaning (e.g., a check icon for “confirmed”).

**Respect theming:** 
- Try to stick to the color variants provided by Inkline to maintain a consistent design system. Avoid manual color overrides unless necessary for your branding.

**Performance considerations:** 
- A `Badge` is lightweight, so performance is rarely a concern. However, if you update the badge count frequently (e.g., real-time updates), ensure it’s efficient (e.g., use watchers or computed properties sparingly).
