---
title: Alert - Inkline
description: Documentation and examples for the Alert component, used for displaying important contextual messages, warnings, or notifications.
---

# Alert

Documentation and examples for the Alert component, used for displaying important contextual messages, warnings, or notifications.

## Overview

The `Alert` component is designed to capture the user's attention by displaying critical messages, notifications, or warnings. It provides a visually distinctive area to communicate information that requires immediate awareness.

The `Alert` component in Inkline is versatile and can be used in various scenarios:
- *Standalone usage:* Display an alert prominently on a page to communicate system messages or errors.
- *Contextual notifications:* Use alerts within forms or pages to provide immediate feedback on user actions.
- *Dismissible messages:* Allow users to close the alert when the information is no longer needed.
- *Enhanced visual cues:* Combine icons and color variants to clearly indicate the nature of the message (e.g., `success`, `warning`, `error`, or `info`).

## Import

```ts
import { Alert } from 'inkline/alert';
```

::DocsImportNotice
::

## Usage

### Basic Usage

In its simplest form, the `Alert` component is rendered with default `info` styling and a basic message.

::DocsTabs
#preview
:DocsComponentDemo{ package="alert" name="basic" }
#code
<!-- :DocsCode{ package="@inkline/component-alert" file="examples/basic.vue" } -->
::

*This example renders an `Alert` with default styling and a basic message.*

### Example: Color Variants

Using the `color` prop, you can quickly style the `Alert` to represent different types of messages such as `info`, `success`, `warning`, or `danger`.

::DocsTabs
#preview
:DocsComponentDemo{ package="alert" name="color-variants" }
#code
<!-- :DocsCode{ package="@inkline/component-alert" file="examples/color-variants.vue" } -->
::

*In this example, the `Alert` is rendered in various color variants to visually distinguish the nature of the alert.*

### Example: Size Variants

Adjust the size of the `Alert` component using the `size` prop to better fit the context in which it is used.

::DocsTabs
#preview
:DocsComponentDemo{ package="alert" name="size-variants" }
#code
<!-- :DocsCode{ package="@inkline/component-alert" file="examples/size-variants.vue" } -->
::

*This example demonstrates small, medium, and large variations of the `Alert` component.*

### Example: Dismissible Alerts

When an alert should no longer persist on the screen, the dismissible variant allows users to close it. This example shows how to enable and handle the dismiss functionality.

::DocsTabs
#preview
:DocsComponentDemo{ package="alert" name="dismissible" }
#code
<!-- :DocsCode{ package="@inkline/component-alert" file="examples/dismissible.vue" } -->
::

*This example shows an `Alert` component with a dismissible option, enabling users to close the alert when appropriate.*

### Example: Alert with Custom Icon

Enhance the visual indication of the alert by including an icon alongside the message. This helps in quickly communicating the nature of the alert.

::DocsTabs
#preview
:DocsComponentDemo{ package="alert" name="icon" }
#code
<!-- :DocsCode{ package="@inkline/component-alert" file="examples/icon.vue" } -->
::

*This example demonstrates how to include an icon within the `Alert` component for added context.*

### Example: Structured Content

Customize the content within the `Alert` component using slots to incorporate additional elements or complex markup.

::DocsTabs
#preview
:DocsComponentDemo{ package="alert" name="content" }
#code
<!-- :DocsCode{ package="@inkline/component-alert" file="examples/content.vue" } -->
::

*This example illustrates how to customize the `Alert` content using slots or additional markup.*

## Props

::DocsCard{ title="Alert Props" }
Below is an outline of available props for the `Alert` component.

::DocsComponentProps{ package="alert" component="Alert" }
::
::

## Events

::DocsCard{ title="Alert Events" }
The `Alert` component emits custom events to handle user interactions. For example, when the alert is dismissible, it emits a `dismiss` event when the dismiss action is triggered.

::DocsComponentEvents{ package="alert" component="Alert" }
::
::

## Slots

::DocsCard{ title="Alert Slots" }
Below is an outline of available slots for the `Alert` component.

::DocsComponentSlots{ package="alert" component="Alert" }
::
::

## Design Tokens

::DocsCard{ title="Alert Design Tokens" }
Below is an outline of available design tokens for the `Alert` component.

::DocsComponentDesignTokens{ package="alert" component="Alert" }
::
::

## Accessibility

To ensure the `Alert` component is accessible, consider the following:

**ARIA roles/attributes:** 
- Use `role="alert"` to indicate that the message is important and should be announced by assistive technologies.

**Keyboard navigation:** 
- Ensure that the elements within the alert are navigable using the **Tab** key by adding `tabindex="0"` to interactive elements.

**Additional guidelines:** 
- Provide clear text and avoid relying solely on color to convey the message, ensuring that users with visual impairments can access the information.

## Best Practices

**Keep messages concise:** 
- Alerts should deliver a clear and direct message without overwhelming the user.

**Use dismissible alerts judiciously:** 
- Only make alerts dismissible when the message is non-critical or when it can be safely removed by the user.

**Employ meaningful color coding:** 
- Use color variants to indicate the type of alert (e.g., success, error, warning, info), but always supplement color with meaningful text.

**Provide contextual relevance:** 
- Ensure that alerts are used in situations that warrant immediate user attention, such as form errors or system warnings.

**Maintain consistency:** 
- Use the `color` prop to maintain consistency with the color palette and convey the nature of the message.
