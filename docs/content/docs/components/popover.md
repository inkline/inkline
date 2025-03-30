---
title: Popover - Inkline
description: Documentation and examples for the Popover component, used for displaying a contextual overlay that can be attached to any element.
---

# Popover

Documentation and examples for the Popover component, used for displaying a contextual overlay that can be attached to any element.

## Overview

A Popover is a contextual overlay that displays supplementary content when a user interacts with an element (such as on hover, click, or focus). It is ideal for showing hints, additional information, or actionable content without cluttering the main interface.

The `Popover` component in Inkline is versatile and can be used in various scenarios:
- *Contextual help:* Display additional information or tips when a user interacts with an element.
- *Interactive actions:* Provide buttons or links within the popover for quick actions.
- *Dynamic content display:* Show detailed content only when needed, keeping the UI clean.
- *Alternative to tooltips:* Offer richer content than traditional tooltips, including formatted text and interactive elements.

## Import

```ts
import { Popover, PopoverHeader, PopoverFooter } from 'inkline/popover';
```

:DocsImportNotice

## Components Structure

The `Popover` component is composed of two distinct parts that work together to deliver contextual overlay functionality:  

```html 
Popover
├── #trigger
├── PopoverHeader
├── ...
└── PopoverFooter
```

### Popover

The `default` slot serves as the main content area for the `Popover` component. Here you can display any information or interactive elements.

Additionally, you have the flexibility to include:
- `PopoverHeader`: An optional section at the top for titles or introductory content.
- `PopoverFooter`: An optional section at the bottom for actions like links or buttons.

### Trigger Element

Place any interactive element — such as a button, icon, or text — into the `trigger` slot to activate the `Popover` component overlay. 

The component provides the necessary event bindings to ensure that when the trigger is clicked or focused, the popover toggles its visibility.

### Popover Header

The `PopoverHeader` component provides a dedicated space at the top of the popover for displaying a title or introductory information. It helps set the context and organize the content within the popover.

### Popover Footer

The `PopoverFooter` component offers an area at the bottom of the popover for supplementary actions, links, or buttons. This clear separation ensures that interactive elements are distinct from the main content.

## Usage

### Basic Usage

In its simplest form, the `Popover` component is used to display a basic overlay. This example demonstrates how to trigger and render a popover with minimal configuration.

::DocsTabs
#preview
:DocsComponentDemo{ package="@inkline/component-popover" file="examples/basic.vue" }
#code
<!-- :DocsCode{ package="@inkline/component-popover" file="examples/basic.vue" } -->
::

*This example renders a `Popover` with default styling and behavior.*

### Example: Color Variants

Using the `color` prop, you can style the `Popover` to match light or dark thematic contexts. 

::DocsTabs
#preview
:DocsComponentDemo{ package="@inkline/component-popover" file="examples/color-variants.vue" }
#code
<!-- :DocsCode{ package="@inkline/component-popover" file="examples/color-variants.vue" } -->
::

*In this example, the `Popover` is rendered with multiple color variants to suit different contexts.*

### Example: Size Variants

The `Popover` can be adjusted in size to better accommodate different amounts of content. 

::DocsTabs
#preview
:DocsComponentDemo{ package="@inkline/component-popover" file="examples/size-variants.vue" }
#code
<!-- :DocsCode{ package="@inkline/component-popover" file="examples/size-variants.vue" } -->
::

*This example showcases small, medium, and large variations of the `Popover` component.*

### Example: Header and Footer

The `Popover` component can also be enhanced with `PopoverHeader` and `PopoverFooter` components, allowing you to separate content into distinct sections.

::DocsTabs
#preview
:DocsComponentDemo{ package="@inkline/component-popover" file="examples/header-footer.vue" }
#code
<!-- :DocsCode{ package="@inkline/component-popover" file="examples/header-footer.vue" } -->
::

### Example: Placement Variants

The `placement` prop allows you to control where the `Popover` appears relative to its trigger element. You can adjust the popover's position to the top, bottom, left, right of the trigger to best fit your layout.

::DocsTabs
#preview
:DocsComponentDemo{ package="@inkline/component-popover" file="examples/placement.vue" }
#code
<!-- :DocsCode{ package="@inkline/component-popover" file="examples/placement.vue" } -->
::

*This example demonstrates various placement options for the `Popover` component.*

### Example: Interaction Listeners

You you to manage interactions such as opening and closing the popover by choosing which event listeners you attach to the trigger element.

::DocsTabs
#preview
:DocsComponentDemo{ package="@inkline/component-popover" file="examples/listeners.vue" }
#code
<!-- :DocsCode{ package="@inkline/component-popover" file="examples/listeners.vue" } -->
::

*This example demonstrates attaching event listeners to the `Popover` for enhanced interactivity.*

## Props

::DocsCard{ title="Popover Props" }
Below is an outline of available props for the `Popover` component.

::DocsComponentProps{ package="@inkline/component-popover" component="Popover" }
::
::

## Events

::DocsCard{ title="Popover Events" }
Below is an outline of available events for the `Popover` component.

::DocsComponentEvents{ package="@inkline/component-popover" component="Popover" }
::
::

## Slots

::DocsCard{ title="Popover Slots" }
Below is an outline of available slots for the `Popover` component.

::DocsComponentSlots{ package="@inkline/component-popover" component="Popover" }
::
::

## Design Tokens

::DocsCard{ title="Popover Design Tokens" }
Below is an outline of available design tokens for the `Popover` component.

::DocsComponentDesignTokens{ package="@inkline/component-popover" component="Popover" }
::
::

## Accessibility

By default, Inkline aims to ensure `Popover` components are accessible out of the box. However, confirm your usage aligns with these best practices and any app-specific guidelines. Here are some accessibility considerations for the `Popover` component:

**ARIA roles/attributes:** 
- Use appropriate ARIA roles such as `tooltip` or `dialog` depending on the context. 
- Add `aria-label` or `aria-describedby` as needed to clarify the popover's purpose.

**Keyboard navigation:** 
- If the popover is interactive, we ensure it can be focused and dismissed using keyboard actions (e.g., **Escape** to close).

**Screen reader considerations:** 
- Provide clear, descriptive text within the popover so that its content is understandable for screen reader users.

**Additional guidelines:** 
- Avoid using the popover for critical information that must always be visible. Use it as a supplementary element to enhance the user experience.

## Best Practices

**Use popovers sparingly:** 
- Ensure that popovers provide additional context without overwhelming the user or cluttering the interface.

**Align with trigger elements:** 
- Position the popover in relation to the element that triggers it to maintain a clear association.

**Provide clear dismissal options:** 
- If the popover is controlled, ensure that users can easily close it via mouse or keyboard.

**Keep content concise:** 
- Use the popover to present brief, relevant information. For more detailed content, consider alternative layouts.

**Test for responsiveness:** 
- Verify that the popover displays correctly on different devices and screen sizes.

