---
title: Loader - Inkline
description: Documentation and examples for the Loader component, used for indicating loading states and progress in your application.
---

# Loader

Documentation and examples for the Loader component, used for indicating loading states and progress in your application.

## Overview

The Loader component provides a visual indicator that an operation is in progress. It is commonly used to signal to users that data is being fetched, processed, or otherwise loading.

The `Loader` component in Inkline is versatile and can be integrated in various scenarios:
- *Full-page or section loading:* Display the Loader when an entire page or a significant section of content is being loaded.
- *Inline or button loading:* Use the Loader within buttons or inline elements to indicate an ongoing action.
- *Conditional rendering:* Show the Loader only when a specific condition is met, such as during data fetching.
- *Component integration:* Combine with other UI components to enhance feedback during asynchronous events.

## Import

```ts
import { Loader } from 'inkline/loader';
```

::DocsImportNotice
::

## Usage

### Basic Usage

In its simplest form, the `Loader` component is used to indicate that content is loading.

::DocsTabs
#preview
:DocsComponentDemo{ package="@inkline/component-loader" file="examples/basic.vue" }
#code
<!-- :DocsCode{ package="@inkline/component-loader" file="examples/basic.vue" } -->
::

*This example renders a `Loader` with the default styling.*

### Example: Color Variants

Using the `color` prop, you can style the `Loader` to match different thematic contexts in your application.

::DocsTabs
#preview
:DocsComponentDemo{ package="@inkline/component-loader" file="examples/color-variants.vue" }
#code
<!-- :DocsCode{ package="@inkline/component-loader" file="examples/color-variants.vue" } -->
::

*In this example, the `Loader` is rendered in various color variants to suit different UI themes.*

### Example: Size Variants

The `size` prop allows you to adjust the dimensions of the `Loader` to match your layout requirements.

::DocsTabs
#preview
:DocsComponentDemo{ package="@inkline/component-loader" file="examples/size-variants.vue" }
#code
<!-- :DocsCode{ package="@inkline/component-loader" file="examples/size-variants.vue" } -->
::

*This example demonstrates small, medium, and large variations of the `Loader` component.*

### Example: Auto Sizing

The auto sizing feature enables the `Loader` to adjust its dimensions based on its container or surrounding content.

::DocsTabs
#preview
:DocsComponentDemo{ package="@inkline/component-loader" file="examples/size-auto.vue" }
#code
<!-- :DocsCode{ package="@inkline/component-loader" file="examples/size-auto.vue" } -->
::

*This example showcases the `Loader` automatically adjusting its size based on its container.*

### Example: Loading Text 

By utilizing a text prop, the `Loader` can display a textual indicator alongside the animation for additional context.

::DocsTabs
#preview
:DocsComponentDemo{ package="@inkline/component-loader" file="examples/text.vue" }
#code
<!-- :DocsCode{ package="@inkline/component-loader" file="examples/text.vue" } -->
::

*This example demonstrates a `Loader` with accompanying progress text to provide extra context during loading.*

## Props

::DocsCard{ title="Loader Props" }
Below is an outline of available props for the `Loader` component.

::DocsComponentProps{ package="@inkline/component-loader" component="Loader" }
::
::

## Events

::DocsCard{ title="Loader Events" }
The `Loader` component does not emit any custom events. However, you can bind native events like `@click` to make the `Loader` interactive if needed.
::

## Slots

::DocsCard{ title="Loader Slots" }
Below is an outline of available slots for the `Loader` component.

::DocsComponentSlots{ package="@inkline/component-loader" component="Loader" }
::
::

## Design Tokens

::DocsCard{ title="Loader Design Tokens" }
Below is an outline of available design tokens for the `Loader` component.

::DocsComponentDesignTokens{ package="@inkline/component-loader" component="Loader" }
::
::

## Accessibility

By default, Inkline aims to ensure `Loader` components are accessible out of the box. However, ensure your usage aligns with these best practices and any app-specific guidelines. Here are some accessibility considerations for the `Loader` component:

**ARIA roles/attributes:**
- Consider using `role="status"` or `aria-live="polite"` on loading components to ensure screen readers announce loading updates.
- Provide an accessible label if the Loader conveys critical information about the loading process.

**Keyboard navigation:**
- The `Loader` component is typically non-interactive. 

**Additional guidelines:**
- Avoid relying solely on color or animation to indicate loading. Include text or iconography if the information is critical.
- Ensure that loading indicators are easily distinguishable and visible to users with visual impairments.

## Best Practices

**Indicate ongoing processes clearly:**
- Use the `Loader` to signal data fetching, processing, or any asynchronous operation to enhance user feedback.
- Remove or hide the Loader promptly once the content has successfully loaded.

**Combine visual cues when necessary:**
- Supplement the `Loader`’s animation with descriptive text or icons if the loading state needs extra clarity.
- Avoid cluttering the UI by overusing loading indicators.

**Consider accessibility from the start:**
- Always provide accessible labels or descriptions for critical loading information.
- Test the component with screen readers and keyboard navigation to ensure an inclusive user experience.

**Maintain consistency:**
- Use the provided Loader variants (color, size, auto sizing) to keep a consistent look and feel across your application.
