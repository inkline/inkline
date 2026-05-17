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
import { Card, CardHeader, CardImage, CardFooter } from 'inkline/card';
```

:DocsImportNotice

## Components Structure

The `Card` component is composed of multiple parts that work together to create a structured and visually appealing layout. Each component plays a specific role:

```html 
Card
├── CardHeader
├── CardImage
├── ...
└── CardFooter
```

### Card

The `default` slot serves as the main content area for the `Card` component. Here you can display any information or interactive elements.

Additionally, you have the flexibility to include:
- `CardHeader`: An optional section at the top for titles or introductory content.
- `CardImage`: An optional section for displaying images within the card.
- `CardFooter`: An optional section at the bottom for actions like links or buttons.

### Card Header

The `CardHeader` component is an optional section that can be used to display a title or introductory information at the top of the card. 
- It helps to provide context and structure to the card's content.
- It can include text, icons, or other elements.

### Card Image

The `CardImage` component is an optional section that allows you to include an image within the card.
- The image spans the full width of the card, providing a visually appealing layout.

### Card Footer

The `CardFooter` component is an optional section that can be used to display additional actions, links, or buttons at the bottom of the card. 
- It helps to provide a clear separation between the card's content and any interactive elements.

## Usage

### Basic Usage

In its simplest form, the `Card` component wraps content with default styling, providing a clean and structured container.

::DocsTabs
#preview
:DocsComponentDemo{ package="@inkline/component-card" file="examples/basic.vue" }
#code
<!-- :DocsCode{ package="@inkline/component-card" file="examples/basic.vue" } -->
::

*This example renders a `Card` with the default styling and a basic content block.*

### Example: Color Variants

Using the `color` prop, you can easily adjust the visual theme of the `Card` component to match various design contexts.

::DocsTabs
#preview
:DocsComponentDemo{ package="@inkline/component-card" file="examples/color-variants.vue" }
#code
<!-- :DocsCode{ package="@inkline/component-card" file="examples/color-variants.vue" } -->
::

*In this example, the `Card` component is showcased with multiple color variants, adapting to different design themes.*

### Example: Header and Footer

The `Card` component can also be enhanced with `CardHeader` and `CardFooter` components, allowing you to separate content into distinct sections.

::DocsTabs
#preview
:DocsComponentDemo{ package="@inkline/component-card" file="examples/header-footer.vue" }
#code
<!-- :DocsCode{ package="@inkline/component-card" file="examples/header-footer.vue" } -->
::

*This example demonstrates the use of header and footer to structure content within the `Card`.*

### Example: Card with Image 

You can include images within the `Card` component to create visually appealing layouts. Using the `CardImage` component, you can have full-width images that fit perfectly within the card.

::DocsTabs
#preview
:DocsComponentDemo{ package="@inkline/component-card" file="examples/image.vue" }
#code
<!-- :DocsCode{ package="@inkline/component-card" file="examples/image.vue" } -->
::

*This example showcases a card with a image using the `CardImage` component.*

## Props

::DocsCard{ title="Card Props" }
Below is an outline of available props for the `Card` component.

::DocsComponentProps{ package="@inkline/component-card" component="Card" }
::
::

## Events

::DocsCard{ title="Card Events" }
The `Card` component does not emit any custom events. However, you can bind native events like `@click` to make the `Card` interactive.
::

## Slots

::DocsCard{ title="Card Slots" }
Below is an outline of available slots for the `Card` component.

::DocsComponentSlots{ package="@inkline/component-card" component="Card" }
::
::


## Design Tokens

::DocsCard{ title="Card Design Tokens" }
Below is an outline of available design tokens for the `Card` component.

::DocsComponentDesignTokens{ package="@inkline/component-card" component="Card" }
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
