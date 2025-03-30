---
title: Button Group - Inkline
description: Documentation and examples for the ButtonGroup component, used for grouping related buttons in a unified style.
---

# Button Group

Documentation and examples for the Button Group component, used for grouping related buttons in a unified style.

## Overview 

A Button Group is a container component designed to group a set of buttons together, ensuring consistent spacing, alignment, and styling. It provides a convenient way to display related actions as a cohesive unit.

The `ButtonGroup` component in Inkline is versatile and can be used in various scenarios:
- *Grouping Actions:* Ideal for combining primary, secondary, and tertiary actions in forms, toolbars, or card footers.
- *Consistent Styling:* Ensures that buttons share a uniform look and feel while maintaining proper spacing.
- *Responsive Layouts:* Supports both horizontal and vertical orientations, adapting to different layout requirements.
- *Interactive Controls:* Can be used to visually organize buttons for navigation or segmented controls.

## Import

```ts
import { ButtonGroup } from 'inkline/button-group';
```

:DocsImportNotice

## Usage

### Basic Usage

A basic button group has a horizontal layout and contains multiple buttons with standard spacing.

::DocsTabs
#preview
:DocsComponentDemo{ package="@inkline/component-button-group" file="examples/basic.vue" }
#code
<!-- :DocsCode{ package="@inkline/component-button-group" file="examples/basic.vue" } -->
::

*This example renders a basic `ButtonGroup` containing multiple buttons.*


### Example: Vertical Layout

You can display a `ButtonGroup` with buttons arranged vertically by using the `vertical` prop.

::DocsTabs
#preview
:DocsComponentDemo{ package="@inkline/component-button-group" file="examples/vertical.vue" }
#code
<!-- :DocsCode{ package="@inkline/component-button-group" file="examples/vertical.vue" } -->
::

*In this demo, the `ButtonGroup` is configured to display buttons in a vertical stack.*


### Example: Color Variants

Using the `color` prop, you can set the sizes of all the buttons within the `ButtonGroup` component.

::DocsTabs
#preview
:DocsComponentDemo{ package="@inkline/component-button-group" file="examples/color-variants" direction="column.vue" }
#code
<!-- :DocsCode{ package="@inkline/component-button-group" file="examples/color-variants.vue" } -->
::

*This example demonstrates color variants for the buttons within the group.*

### Example: Size Variants

Using the `size` prop, you can set the sizes of all the buttons within the `ButtonGroup` component.

::DocsTabs
#preview
:DocsComponentDemo{ package="@inkline/component-button-group" file="examples/size-variants" direction="column.vue" }
#code
<!-- :DocsCode{ package="@inkline/component-button-group" file="examples/size-variants.vue" } -->
::

*This example demonstrates small, medium, and large for the buttons within the group.*

::DocsTabs
#preview
:DocsComponentDemo{ package="@inkline/component-button-group" file="examples/vertical-size-variants.vue" }
#code
<!-- :DocsCode{ package="@inkline/component-button-group" file="examples/vertical-size-variants.vue" } -->
::

*This example demonstrates small, medium, and large for the buttons within the vertical group.*


### Example: Block Variant

Using the `block` prop, you can render a `ButtonGroup` component that stretches to fill the width of its container using a block layout.

::DocsTabs
#preview
:DocsComponentDemo{ package="@inkline/component-button-group" file="examples/block.vue" }
#code
<!-- :DocsCode{ package="@inkline/component-button-group" file="examples/block.vue" } -->
::

*The block variant ensures the buttons take up the full width of their container.*

You can combine the vertical orientation of the `ButtonGroup` component with the block layout using the `block` and `vertical` props, allowing the buttons to stack vertically and stretch to the full container width.

::DocsTabs
#preview
:DocsComponentDemo{ package="@inkline/component-button-group" file="examples/vertical-block.vue" }
#code
<!-- :DocsCode{ package="@inkline/component-button-group" file="examples/vertical-block.vue" } -->
::

*This demo renders a vertically oriented `ButtonGroup` that also uses a block layout.*

### Example: Disabled State

Using the `disabled` prop, you can disable all the buttons within the `ButtonGroup` component, indicating non-interactive states for specific actions.

::DocsTabs
#preview
:DocsComponentDemo{ package="@inkline/component-button-group" file="examples/disabled.vue" }
#code
<!-- :DocsCode{ package="@inkline/component-button-group" file="examples/disabled.vue" } -->
::

*In this demo, certain buttons within the `ButtonGroup` are disabled to signify unavailable actions.*

### Example: Nested Button Groups

You can nest `ButtonGroup` components within each other, which can be useful for complex interfaces where grouping sub-actions is required.

::DocsTabs
#preview
:DocsComponentDemo{ package="@inkline/component-button-group" file="examples/nested.vue" }
#code
<!-- :DocsCode{ package="@inkline/component-button-group" file="examples/nested.vue" } -->
::

*This demo illustrates the nesting of button groups to create hierarchical action structures.*

You can extends the nested configuration by using the `block` variant within nested button groups, ensuring full-width alignment even in complex layouts.

::DocsTabs
#preview
:DocsComponentDemo{ package="@inkline/component-button-group" file="examples/nested-block.vue" }
#code
<!-- :DocsCode{ package="@inkline/component-button-group" file="examples/nested-block.vue" } -->
::

*In this advanced demo, nested button groups are rendered with a block layout to maintain consistent spacing and alignment.*

## Props

::DocsCard{ title="Button Group Props" }
Below is an outline of available props for the `ButtonGroup` component.

::DocsComponentProps{ package="@inkline/component-button-group" component="ButtonGroup" }
::
::

## Events

::DocsCard{ title="Button Group Events" }
The `ButtonGroup` component does not emit any custom events. However, you can bind native events like `@click` to the individual buttons within the group.
::

## Slots

::DocsCard{ title="Button Group Slots" }
Below is an outline of available slots for the `ButtonGroup` component.

::DocsComponentSlots{ package="@inkline/component-button-group" component="ButtonGroup" }
::
::

## Design Tokens

::DocsCard{ title="Button Group Design Tokens" }
Below is an outline of available design tokens for the `ButtonGroup` component.

::DocsComponentDesignTokens{ package="@inkline/component-button-group" component="ButtonGroup" }
::
::

## Accessibility

By default, Inkline aims to ensure `ButtonGroup` components are accessible out of the box. However, confirm your usage aligns with these best practices and any app-specific guidelines. Here are some accessibility considerations for the `ButtonGroup` component:

**ARIA Roles/Attributes:** 
- If the button group functions as a toolbar or segmented control, consider using appropriate ARIA roles (e.g., `role="toolbar"`) and labels.

**Keyboard Navigation:** 
- Ensure that the buttons are focusable and navigable using keyboard controls such as Tab and arrow keys.

**Descriptive Labels:** 
- Provide accessible labels for each button, especially if icons or color cues are used to indicate function.

**Contrast and Focus Indicators:** 
- Maintain sufficient contrast and visible focus indicators for all buttons to support users with visual impairments.

## Best Practices

**Limit the Number of Buttons:**
- Avoid overcrowding the `ButtonGroup` with too many buttons.
- Group related actions logically. If necessary, consider using nested button groups for complex interfaces.

**Consistent Button Styles:** 
- Ensure that all buttons within the group adhere to a consistent style for a harmonious design.

**Responsive Design:** 
- Verify that the `ButtonGroup` adapts well to different screen sizes, particularly when switching between horizontal and vertical layouts.

**Use Native Events:** 
- Bind native events (e.g., `@click`) to individual buttons as needed to ensure the group remains interactive.
- Avoid nesting interactive elements within buttons to prevent conflicts.

**Combine with Icons Judiciously:**
- If using icons within buttons, ensure they enhance clarity without compromising readability.
