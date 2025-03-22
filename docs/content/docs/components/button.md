---
title: Button - Inkline
description: Documentation and examples for the Button component, a versatile, clickable element that represents actions, links, or routes within the application.
---

# Button

Documentation and examples for the Button component, a versatile, clickable element that represents actions, links, or routes within the application.

## Overview

The Button component is built to be accessible, customizable, and adaptable to various interaction scenarios. It represents one of the core building blocks of an application.

The Button component in Inkline can be used in a variety of contexts:
- *Form submissions:* Trigger actions such as submitting forms or processing data.
- *Interactive controls:* Execute functions, toggle states, or open dialogs.
- *Navigation:* Serve as interactive elements for navigating between pages or sections.
- *Call-to-action elements:* Emphasize important actions like “Sign Up”, “Learn More”, or “Buy Now”.

## Import

```ts
import { Button } from 'inkline/button';
```

:DocsImportNotice

## Usage

### Basic Usage

Use the `Button` component to create a standard clickable element in your application.

::DocsTabs
#preview
:DocsComponentDemo{ package="button" name="basic" }
#code
<!-- :DocsCode{ package="@inkline/component-button" file="examples/basic.vue" } -->
::

*This example demonstrates the default Button with standard styling and behavior.*


### Example: Color Variants

Using the `color` prop, you can quickly style the `Button` component in different thematic contexts.

::DocsTabs
#preview
:DocsComponentDemo{ package="button" name="color-variants" }
#code
<!-- :DocsCode{ package="@inkline/component-button" file="examples/color-variants.vue" } -->
::

*In this example, the `Button` is rendered in various color variants to suit different themes.*


### Example: Size Variants

Using the `size` prop, you can quickly style the `Button` component in different sizes.

::DocsTabs
#preview
:DocsComponentDemo{ package="button" name="size-variants" }
#code
<!-- :DocsCode{ package="@inkline/component-button" file="examples/size-variants.vue" } -->
::

*In this example, the `Button` is rendered in various size variants.*

### Example: Routing Button

Using the pre-configured `vue-router` integration, you can use the `Button` component to navigate to different routes while maintaining the button's visual consistency.

::DocsTabs
#preview
:DocsComponentDemo{ package="button" name="routing" }
#code
<!-- :DocsCode{ package="@inkline/component-button" file="examples/routing.vue" } -->
::

*In this example, the Button integrates with Vue Router to navigate between routes.*

### Example: Button Tag

You can render the Button as a different HTML element using the `tag` prop, allowing it to function as a input or another element.

::DocsTabs
#preview
:DocsComponentDemo{ package="button" name="button-tag" }
#code
<!-- :DocsCode{ package="@inkline/component-button" file="examples/button-tag.vue" } -->
::

*In this example, the Button is rendered as a different HTML element using the `tag` prop.*

### Example: Button Type

You can change the behaviour of a button in various contexts by using the `type` prop. For example, you can set form button types (e.g., `submit`, `reset`, `button`) to handle various form interactions.

::DocsTabs
#preview
:DocsComponentDemo{ package="button" name="button-type" }
#code
<!-- :DocsCode{ package="@inkline/component-button" file="examples/button-type.vue" } -->
::

*In this example, the `Button` has a different `type` for form interactions.*

### Example: Block Button Variant

You can use the `block` prop if you want to render a block-level `Button` component that spans the full width of its container.

::DocsTabs
#preview
:DocsComponentDemo{ package="button" name="block" }
#code
<!-- :DocsCode{ package="@inkline/component-button" file="examples/block.vue" } -->
::

*In this example, the `Button` is rendered as a block-level element spanning the full container width.*


### Example: Icon Button Variant

You can add an icon to the `Button` component using the `icon` slot. This provides a visual representation of its action, enhancing clarity and aesthetics.

::DocsTabs
#preview
:DocsComponentDemo{ package="button" name="icon" }
#code
<!-- :DocsCode{ package="@inkline/component-button" file="examples/icon.vue" } -->
::

*In this example, the `Button` includes an icon to visually convey its purpose.*

### Example: Circle Button Variant

You can render the `Button` component as a circle using the `circle` prop, which is useful for icon buttons or floating action buttons.

::DocsTabs
#preview
:DocsComponentDemo{ package="button" name="circle" }
#code
<!-- :DocsCode{ package="@inkline/component-button" file="examples/circle.vue" } -->
::

*In this example, the Button is rendered in a circular format for icon-based actions.*

### Example: Square Button Variant

You can render the `Button` component as a square using the `square` prop, suitable for icon buttons or minimalist designs.

::DocsTabs
#preview
:DocsComponentDemo{ package="button" name="square" }
#code
<!-- :DocsCode{ package="@inkline/component-button" file="examples/square.vue" } -->
::

*In this example, the Button is rendered in a circular format for icon-based actions.*

### Example: Link Button Variant

You can style the `Button` component as a link using the `link` prop, combining the visual cues of a hyperlink with the interactive behavior of a button.

::DocsTabs
#preview
:DocsComponentDemo{ package="button" name="link" }
#code
<!-- :DocsCode{ package="@inkline/component-button" file="examples/link.vue" } -->
::

*In this example, the Button is styled as a link while retaining its interactive properties.*

### Example: Outline Button Variant

You can use the `outline` prop to apply an outline style to the `Button` component, offering a subtle alternative to fully filled buttons for less prominent actions.

::DocsTabs
#preview
:DocsComponentDemo{ package="button" name="outline" }
#code
<!-- :DocsCode{ package="@inkline/component-button" file="examples/outline.vue" } -->
::

*In this example, the Button is rendered with an outline style.*

### Example: Active State

You can use the `active` prop to indicate the active state of the `Button` component, highlighting its appearance when pressed or selected. This will also add the `aria-pressed="true"` accessibility attribute.

::DocsTabs
#preview
:DocsComponentDemo{ package="button" name="state-active" }
#code
<!-- :DocsCode{ package="@inkline/component-button" file="examples/state-active.vue" } -->
::

*In this example, the Button displays an active state to indicate user interaction.*

### Example: Disabled State

You can use the `disabled` prop to indicate the disabled state of the `Button` component, preventing user interactions while providing a visual cue.

::DocsTabs
#preview
:DocsComponentDemo{ package="button" name="state-disabled" }
#code
<!-- :DocsCode{ package="@inkline/component-button" file="examples/state-disabled.vue" } -->
::

*In this example, the Button is rendered in a disabled state, making it unclickable.*

### Example: Loading State

You can use the `loading` prop to indicate the loading state of the `Button` component, commonly used to indicate that an action is in progress and to prevent further interaction until it's completed.

By default, the button will display a standard `Loader` component. You can provide custom loading state by providing the `loading` and `loading-icon` slots.

::DocsTabs
#preview
:DocsComponentDemo{ package="button" name="state-loading" }
#code
<!-- :DocsCode{ package="@inkline/component-button" file="examples/state-loading.vue" } -->
::

*In this example, the `Button` shows a loading state to inform the user that a process is underway.*

## Props

::DocsComponentProps{ package="button" component="Button" }
::

## Events

The Button component does not emit any custom events. However, you can bind native events such as `@click` to handle user interactions.

## Slots

::DocsComponentSlots{ package="button" component="Button" }
::

## Accessibility

**ARIA roles/attributes:** 

- Ensure that buttons have an appropriate ARIA tags if a native `<button>` element is not used
- Ensure that you provide an `aria-label` for icon-only buttons.

**Keyboard navigation:** 
- Ensure that the Button remains focusable and operable via keyboard inputs, typically using the **Enter** or **Space** keys.

**Contrast and focus indicators:** 
- Maintain sufficient color contrast and include visible focus indicators to support users with visual impairments when implementing a custom design.

**Descriptive text:** 
- Use clear, concise labels to convey the button's purpose, especially when incorporating icons.

## Best Practices

**Consistent styling:** 
- Use the `Button` component consistently across your application to maintain a cohesive design.

**Meaningful labels:** 
- Ensure that `Button` text clearly describes the action to be performed.

**State management:** 
- Implement `disabled`, `loading`, or `active` states to provide visual feedback during interactions.
- Use the `disabled` prop to prevent user interactions when the button is inactive.

**Avoid nested interactive elements:** 
- Do not nest buttons or other clickable elements within a `Button`.

**Responsive design:** 
- Adapt `Button` sizes and spacing for optimal usability on various devices and screen sizes.

