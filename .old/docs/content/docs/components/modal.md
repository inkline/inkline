---
title: Modal - Inkline
description: Documentation and examples for the Modal component, used for displaying modal dialogs and overlays.
---

# Modal

Documentation and examples for the Modal component, used for displaying modal dialogs and overlays.

## Overview

The Modal component is used to display content in a dialog overlay that interrupts the user’s workflow, requiring interaction before returning to the main content. It provides a flexible way to present forms, alerts, or additional contextual information in a focused interface.

The `Modal` component in Inkline is versatile and can be easily customized to fit various use cases:
- *Standalone dialogs:* Present a modal for confirmations, alerts, or additional information.
- *Form integration:* Encapsulate forms or user input within a modal for focused interactions.
- *Interactive experiences:* Create guided user experiences with step-by-step instructions.
- *Fullscreen display:* Optionally render the modal in fullscreen mode for immersive contexts.

::DocsAlert
To create modals on-demand programmatically, you can use the [Modal Service](/docs/services/modal).
::

## Import

```ts
import { Modal } from 'inkline/modal';
```

::DocsImportNotice
::

## Usage

### Basic Usage

In its simplest form, the `Modal` component is used to display a dialog overlay. A basic modal would contain a title, content area, and close button.

::DocsTabs
#preview
:DocsComponentDemo{ package="@inkline/component-modal" file="components/modal/examples/basic.vue" }
#code
<!-- :DocsCode{ package="@inkline/component-modal" file="components/modal/examples/basic.vue" } -->
::

*This example renders a `Modal` with default styling and basic functionality.*

### Example: Color Variants

Using the `color` prop, you can customize the appearance of the modal header, backdrop, or content area to match different thematic contexts.

::DocsTabs
#preview
:DocsComponentDemo{ package="@inkline/component-modal" file="components/modal/examples/color-variants.vue" }
#code
<!-- :DocsCode{ package="@inkline/component-modal" file="components/modal/examples/color-variants.vue" } -->
::

*In this example, the `Modal` component is rendered with various color schemes to illustrate theming options.*

### Example: Size Variants

The `size` prop allows you to quickly adjust the modal dimensions to suit different contexts, from compact alerts to larger content displays.

::DocsTabs
#preview
:DocsComponentDemo{ package="@inkline/component-modal" file="components/modal/examples/size-variants.vue" }
#code
<!-- :DocsCode{ package="@inkline/component-modal" file="components/modal/examples/size-variants.vue" } -->
::

*This example demonstrates different size configurations for the `Modal` component.*

### Example: Fullscreen Mode

The `fullscreen` prop can be used to display the modal in a fullscreen layout, ideal for immersive experiences or mobile contexts.

::DocsTabs
#preview
:DocsComponentDemo{ package="@inkline/component-modal" file="components/modal/examples/fullscreen.vue" }
#code
<!-- :DocsCode{ package="@inkline/component-modal" file="components/modal/examples/fullscreen.vue" } -->
::

*This example shows how the `Modal` component can be displayed in fullscreen mode, covering the entire viewport.*

## Props

::DocsCard{ title="Modal Props" }
Below is an outline of available props for the `Modal` component.

::DocsComponentProps{ package="@inkline/component-modal" component="Modal" }
::
::

## Events

::DocsCard{ title="Modal Events" }
Below is an outline of available events for the `Modal` component.

::DocsComponentEvents{ package="@inkline/component-modal" component="Modal" }
::
::

## Slots

::DocsCard{ title="Modal Slots" }
Below is an outline of available slots for the `Modal` component, allowing you to insert custom content such as headers, body, and footer.

::DocsComponentSlots{ package="@inkline/component-modal" component="Modal" }
::
::

## Design Tokens

::DocsCard{ title="Modal Design Tokens" }
Below is an outline of available design tokens for the `Modal` component.

::DocsComponentDesignTokens{ package="@inkline/component-modal" component="Modal" }
::
::

## Accessibility

By default, Inkline aims to ensure `Modal` components are accessible out of the box. However, confirm your usage aligns with these best practices and any app-specific guidelines. Here are some accessibility considerations for the `Modal` component:

**ARIA roles/attributes:**
- Ensure the modal has `role="dialog"` or `role="alertdialog"` to clearly convey its purpose.
- Provide `aria-labelledby` and `aria-describedby` attributes to associate the modal title and content.

**Keyboard navigation:**
- Trap focus within the modal when it is open.
- Allow closing the modal with the **Esc** key.

**Screen reader considerations:**
- Announce the modal when it opens.
- Provide clear and descriptive labels for interactive elements.

**Focus management:**
- Return focus to the triggering element after the modal is closed.

## Best Practices

**Use modals sparingly:** 
- Only interrupt the user flow with a modal when it is necessary for critical interactions.

**Provide clear actions:** 
- Ensure that actions such as confirm and cancel are clearly labeled and accessible.

**Keep content concise:** 
- Avoid overloading the modal with too much information; focus on a single task or message.

**Ensure responsiveness:** 
- Test the modal on various screen sizes to guarantee usability on both desktop and mobile devices.

**Manage focus:** 
- Implement proper focus management to prevent keyboard traps and ensure a seamless user experience.
