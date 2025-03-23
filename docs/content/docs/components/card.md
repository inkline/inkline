---
title: Card - Inkline
description: Documentation and examples for the Card component, used for displaying content in a card layout with headers, footers, and structured content areas.
---

# Card

Documentation and examples for the Card component, used for displaying content in a card layout with headers, footers, and structured content areas.

## Overview

A Card is a versatile container component that encapsulates content within a visually distinct panel layout. It is designed to segment related information into sections, making it easier for users to read content.

The `Card` component in Inkline can be used in various scenarios:
- *Standalone usage:* Wrap content in a card to highlight a specific block of information.
- *Grouped content:* Organize text, images, and actions into clearly defined sections.
- *Dashboard layout:* Display multiple cards as panels for summarizing data or statistics.
- *Interactive elements:* Combine with buttons or links to create clickable cards for navigation or actions.

## Import

```ts
import { Card } from 'inkline/card';
```

:DocsImportNotice

## Usage

### Basic Usage

In its simplest form, the `Card` component wraps content with default styling, providing a clean and structured container.

::DocsTabs
#preview
:DocsComponentDemo{ package="card" name="basic" }
#code
<!-- :DocsCode{ package="@inkline/component-card" file="examples/basic.vue" } -->
::

*This example renders a `Card` with the default styling and a basic content block.*

### Example: Color Variants

Using the `color` prop, you can easily adjust the visual theme of the `Card` component to match various design contexts.

::DocsTabs
#preview
:DocsComponentDemo{ package="card" name="color-variants" }
#code
<!-- :DocsCode{ package="@inkline/component-card" file="examples/color-variants.vue" } -->
::

*In this example, the `Card` component is showcased with multiple color variants, adapting to different design themes.*

### Example: Size Variants

Using the `size` prop, you can modify the padding, typography, and overall scale of the `Card` component.

::DocsTabs
#preview
:DocsComponentDemo{ package="card" name="size-variants" }
#code
<!-- :DocsCode{ package="@inkline/component-card" file="examples/size-variants.vue" } -->
::

*This example demonstrates the `Card` component in various sizes, including small, medium, and large variants.*

### 🚧 Example: Header and Footer (WIP)

The `Card` component can also be enhanced with `CardHeader` and `CardFooter` components, allowing you to separate content into distinct sections.

::DocsAlert{ color="warning" }
The `CardHeader` and `CardFooter` components are currently a work in progress. Check back soon for updates!
::


## Props

::DocsCard{ title="Card Props" }
Below is an outline of available props for the `Card` component.

::DocsComponentProps{ package="card" component="Card" }
::
::

## Events

::DocsCard{ title="Card Events" }
The `Card` component does not emit any custom events. However, you can bind native events like `@click` to make the `Card` interactive.
::

## Slots

::DocsCard{ title="Card Slots" }
Below is an outline of available slots for the `Card` component.

::DocsComponentSlots{ package="card" component="Card" }
::
::


## Design Tokens

::DocsCard{ title="Card Design Tokens" }
Below is an outline of available design tokens for the `Card` component.

::DocsComponentDesignTokens{ package="card" component="Card" }
::
::

## Accessibility

By default, Inkline aims to ensure `Card` components are accessible out of the box. However, confirm your usage aligns with these best practices and any app-specific guidelines. Here are some accessibility considerations for the `Card` component:

**ARIA roles/attributes:**
- Consider using landmark roles such as `region` or `group` to define the card as a distinct section of the page.
- If the card contains important content or interactive elements, provide an `aria-label` or `aria-labelledby` to clarify its purpose for screen readers.

**Keyboard navigation:**
- Although `Card` components are typically non-interactive, if you make a card clickable, ensure it is focusable (e.g., by adding `tabindex="0"`) and operable via keyboard (respond to **Enter** or **Space** keys).

**Additional guidelines:**
- Provide alternative text for any icons or images within the card to ensure that all conveyed information is accessible.
- Avoid relying solely on color to indicate information. You should combine color with text or icons for clarity.

## Best Practices

**Keep content concise:**
- Use `Card` components to encapsulate related information without overcrowding the design.

**Utilize header and footer for structure:**
- Leverage the `CardHeader` and `CardFooter` components to clearly separate the card’s content into logical sections.

**Consistent theming:**
- Adhere to the predefined color and size variants provided by Inkline to maintain visual consistency across your application.

**Interactive cues:**
- When using cards as clickable elements, clearly indicate their interactive nature with visual cues and proper ARIA attributes.

**Performance considerations:**
- While cards are lightweight components, ensure that any dynamic content within them is efficiently managed, especially in data-intensive dashboards.
