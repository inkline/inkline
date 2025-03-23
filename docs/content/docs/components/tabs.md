---
title: Tabs - Inkline
description: Documentation and examples for the Tabs component, used for creating tabbed navigation interfaces that allow users to switch between different views.
---

# Tabs

Documentation and examples for the Tabs component, used for creating tabbed navigation interfaces that allow users to switch between different views.

## Overview

The Tabs component is a container that organizes content into multiple tabbed sections, allowing users to switch between different views without leaving the current context.

The `Tabs` component in Inkline is versatile and can be used in various scenarios:
- *Navigation between content sections:* Organize and switch between different areas of content efficiently.
- *Dashboard interfaces:* Seamlessly separate panels or dashboard widgets into distinct tabs.
- *Form segmentation:* Group related form elements or settings in separate tabs to enhance usability.
- *Content organization:* Improve readability by breaking down large amounts of information into manageable, categorized sections.

## Components Overview

The Inkline tabs system is composed of multiple components that work together to create a dynamic and accessible tabbed interface. Each component plays a specific role:

### Tabs
The `Tabs` component is the main container component that orchestrates the tabbed interface. 
- It manages the active state of the tabs and coordinates the interactions between the tab headers and their associated content panels.

### Tab List 
The `TabList` component serves as a container for individual `Tab` components. 
- It ensures that the tabs are displayed in a structured manner, in a horizontal row, and facilitates keyboard navigation between tabs.

### Tab
The `Tab` component represents an individual tab header. 
- It is clickable and is responsible for activating its corresponding `TabPanel` when selected. 
- It is associated to a `TabPanel` using the `name` prop.
- It includes visual cues to indicate whether it is active or inactive.

### Tab Panel 
The `TabPanel` component displays the content related to the active tab. 
- It is associated to a `Tab` using the `name` prop.
- Only one panel is visible at a time, corresponding to the currently selected `Tab`, which helps maintain a clean and focused interface.

These components are designed to work together seamlessly, ensuring that the user experience remains intuitive and accessible.

## Import

```ts
import { Tabs, TabList, Tab, TabPanel } from 'inkline/tabs';
```

:DocsImportNotice

## Usage

### Basic Usage

In its simplest form, the `Tabs` component is used together with `TabList`, `Tab`, and `TabPanel` components to create a basic tabbed interface with default styling. 

::DocsTabs
#preview
:DocsComponentDemo{ package="tabs" name="basic" }
#code
<!-- :DocsCode{ package="@inkline/component-tabs" file="examples/basic.vue" } -->
::

*This example renders a `Tabs` component with default settings and basic tab structure.*

### Example: Color Variants

Using the `color` prop, you can quickly style the `Tabs` component to match various thematic contexts.

::DocsTabs
#preview
:DocsComponentDemo{ package="tabs" name="color-variants" }
#code
<!-- :DocsCode{ package="@inkline/component-tabs" file="examples/color-variants.vue" } -->
::

*In this example, the `Tabs` component is rendered in light and dark color variants.*

### Example: Size Variants

The `Tabs` component supports different sizes to better fit your design needs. Adjusting the `size` prop modifies the spacing, font size, and overall dimensions of the tab elements.

::DocsTabs
#preview
:DocsComponentDemo{ package="tabs" name="size-variants" }
#code
<!-- :DocsCode{ package="@inkline/component-tabs" file="examples/size-variants.vue" } -->
::

*This example demonstrates small, medium, and large variations of the `Tabs` component.*

### Example: Stretch Mode

The stretch mode allows the tabs to expand and fill the available width, ensuring a consistent layout across different screen sizes.

::DocsTabs
#preview
:DocsComponentDemo{ package="tabs" name="stretch" }
#code
<!-- :DocsCode{ package="@inkline/component-tabs" file="examples/stretch.vue" } -->
::

*This example renders the `Tabs` component with stretch behavior, making the tabs expand to fill the container.*

## Props

::DocsCard{ title="Tabs Props" }
Below is an outline of available props for the `Tabs` component.

::DocsComponentProps{ package="tabs" component="Tabs" }
::
::

::DocsCard{ title="Tab List Props" }
Below is an outline of available props for the `TabList` component.

::DocsComponentProps{ package="tabs" component="TabList" }
::
::

::DocsCard{ title="Tab Props" }
Below is an outline of available props for the `Tab` component.

::DocsComponentProps{ package="tabs" component="Tab" }
::
::

::DocsCard{ title="Tab Panel Props" }
Below is an outline of available props for the `TabPanel` component.

::DocsComponentProps{ package="tabs" component="TabPanel" }
::
::

## Events

::DocsCard{ title="Tabs Events" }
Below is an outline of available events for the `Tabs` component.

::DocsComponentEvents{ package="tabs" component="Tabs" }
::
::

::DocsCard{ title="Tab List Events" }
The `TabList` component does not emit any events.
::

::DocsCard{ title="Tab Events" }
The `Tab` component does not emit any events. However, you can bind native events like `@click` to handle custom interactions.
::

::DocsCard{ title="Tab Panel Events" }
The `TabPanel` component does not emit any events.
::

## Slots

::DocsCard{ title="Tabs Slots" }
Below is an outline of available slots for the `Tabs` component.

::DocsComponentSlots{ package="tabs" component="Tabs" }
::
::

::DocsCard{ title="Tab List Slots" }
Below is an outline of available slots for the `TabList` component.

::DocsComponentSlots{ package="tabs" component="TabList" }
::
::

::DocsCard{ title="Tab Slots" }
Below is an outline of available slots for the `Tab` component.

::DocsComponentSlots{ package="tabs" component="Tab" }
::
::

::DocsCard{ title="Tab Panel Slots" }
Below is an outline of available slots for the `TabPanel` component.

::DocsComponentSlots{ package="tabs" component="TabPanel" }
::
::

## Design Tokens

::DocsCard{ title="Tabs Design Tokens" }
The `Tabs` component itself acts as a wrapper and does not have any design tokens.
::

::DocsCard{ title="Tab List Design Tokens" }
Below is an outline of available design tokens for the `TabList` component.

::DocsComponentDesignTokens{ package="tabs" component="TabList" }
::
::

::DocsCard{ title="Tab Design Tokens" }
Below is an outline of available design tokens for the `Tab` component.

::DocsComponentDesignTokens{ package="tabs" component="Tab" }
::
::

::DocsCard{ title="Tab Panel Design Tokens" }
Below is an outline of available design tokens for the `TabPanel` component.

::DocsComponentDesignTokens{ package="tabs" component="TabPanel" }
::
::


## Accessibility

By default, Inkline aims to ensure `Tabs` components are accessible out of the box. However, confirm your usage aligns with these best practices and any app-specific guidelines. Here are some accessibility considerations for the `Tabs` component:

**ARIA roles/attributes:**
- We automatically add `role="tablist"` to the `TabList` component to indicate that it contains a list of tabs.
- We automatically add `role="tab"` to each `Tab`, and `role="tabpanel"` to each associated panel.
- We automatically add `aria-controls` and `aria-labelledby` to associate tabs with their corresponding panels.
- We automatically add `aria-selected` to clearly indicate the active tab.

**Keyboard navigation:**
- Allow users to navigate between tabs using the arrow keys.
- Ensure that tabs can be focused and activated using **Enter** or **Space** keys.

**Additional guidelines:**
- Provide clear, concise labels for each tab.
- If icons are used, include accompanying text to ensure meaning is conveyed to screen reader users.

## Best Practices

**Keep tab titles concise:** 
- Use short, descriptive titles for clarity.

**Optimize for accessibility:** 
- Implement proper ARIA attributes and support keyboard navigation.

**Use tabs for logical segmentation:** 
- Apply the `Tabs` component only when content can be naturally divided into distinct sections.

**Test responsiveness:** 
- Ensure the tab layout adapts well on various screen sizes, especially when using stretch mode.
