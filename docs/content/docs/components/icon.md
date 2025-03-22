---
title: Icon - Inkline
description: Documentation and examples for the Icon component, used for displaying basic Inkline vector icons in various sizes and colors.
---

# Icon

Documentation and examples for the Icon component, used for displaying basic Inkline vector icons in various sizes and colors.

## Overview

The Icon component provides a flexible and customizable way to display vector icons in your application. It provides a minimal range of icons used throughout Inkline's components.

The `Icon` component in Inkline is versatile and can be used in various scenarios:
- *Standalone usage:* Render an icon as a visual indicator or decorative element.
- *In combination with text or buttons:* Enhance buttons, links, or labels with icons to improve clarity.
- *Dynamic display:* Show or change icons based on application state (e.g., active, inactive, error, success).
- *Navigation elements:* Use icons in menus or navigation bars to help user recognition.

## Import

```ts
import { Icon } from 'inkline/icon';
```

:DocsImportNotice

## Usage

### Basic Usage

In its simplest form, the `Icon` component is used to render an icon with default styling and behavior.

::DocsTabs
#preview
:DocsComponentDemo{ package="icon" name="icons" }
#code
<!-- :DocsCode{ package="@inkline/component-icon" file="examples/icons.vue" } -->
::

*This example renders the Icon component with its default styling.*

### Example: Color Variants

You can customize the color of the `Icon` component in various ways:
- Use the `color` prop to set a predefined color variant 
- Use a utility CSS Class such as `.tw:color-primary` 
- Use inline styles such as `color: var(--color-primary)`

::DocsTabs
#preview
:DocsComponentDemo{ package="icon" name="color-variants" }
#code
<!-- :DocsCode{ package="@inkline/component-icon" file="examples/color-variants.vue" } -->
::

*In this example, the Icon component is rendered in various color variants using inline styles.*

### Example: Size Variants

You can customize the size of the `Icon` component in various ways:
- Use the `size` prop to set a numeric value 
- Use the `width` and `height` props to set specific dimensions
- Use a utility CSS Class such as `.tw:font-[size]`
- Use inline styles such as `font-size: [size]px`

::DocsTabs
#preview
:DocsComponentDemo{ package="icon" name="size" }
#code
<!-- :DocsCode{ package="@inkline/component-icon" file="examples/size.vue" } -->
::

*This example demonstrates small, medium, and large variations of the Icon component.*

## Adding Custom Icons

Inkline provides a set of basic icons that can be used out of the box. However, you can also add custom icons to your application by defining them as renderable SVG objects and using the `Icon` component to render them.

**Developer Experience Recommendation**
- We recommend using the [Icônes](https://icones.js.org/) website for browsing through thousands of icons across multiple icon packages
- Although very flexible, defining custom icons as renderable SVG objects can be cumbersome and error-prone

To import thousands icons directly into your application:
- If you're using **Vite**, for a better developer experience, we recommend using the [Unplugin Icons](https://github.com/unplugin/unplugin-icons) plugin
- If you're using **Nuxt**, for a better developer experience, we recommend using the [Nuxt Icon](https://nuxt.com/modules/icon) module

```ts
import { createApp } from 'vue';
import { Inkline, iconsAddon } from 'inkline';

const app = createApp(App);

const customIcons = {
    'ink:custom-icon': {
        prefix: 'ink',
        name: 'custom-icon',
        body: [
            {
                type: 'svg',
                props: {
                    xmlns: 'http://www.w3.org/2000/svg',
                    width: '1em',
                    height: '1em',
                    viewBox: '0 0 16 16'
                },
                children: [
                    {
                        type: 'path',
                        props: {
                            fill: 'currentColor',
                            d: 'm7.247 4.86l-4.796 5.481c-.566.647-.106 1.659.753 1.659h9.592a1 1 0 0 0 .753-1.659l-4.796-5.48a1 1 0 0 0-1.506 0z'
                        }
                    }
                ]
            }
        ]
    }
}

app.use(Inkline, {
    ...,
    icons: {
        definitions: customIcons
    }
})
```

## Props

Below is an outline of available props for the `Icon` component.

::DocsComponentProps{ package="icon" component="Icon" }
::

## Events

The `Icon` component does not emit any custom events. However, you can bind native events like `@click` to make the Icon interactive.

## Slots

The `Icon` component does not have any slots. 

## Accessibility

To ensure that the `Icon` component is accessible, consider the following guidelines:

**ARIA roles/attributes:**
- If the icon is purely decorative, add `aria-hidden="true"` to hide it from assistive technologies.
- If the icon conveys important information, use an appropriate `aria-label` or `role` (e.g., `role="img"`) to describe its purpose.

**Keyboard navigation:**
- Typically, icons are non-interactive. If an icon is clickable or interactive, ensure it is focusable (using `tabindex="0"`) and supports activation via the **Enter** or **Space** keys.

**Additional guidelines:**
- Provide a textual alternative if the icon relies solely on color to convey meaning.
- Ensure sufficient contrast between the icon and its background for better visibility.

## Best Practices

**Maintain simplicity:**
- Keep icons simple and uncluttered to ensure clarity and quick recognition.

**Accessible design:**
- Always include accessible labels or alternative text when icons are used to convey important information.

**Pair when needed:**
- Combine icons with text labels if the icon alone may not sufficiently communicate its purpose.
- Combine icons with buttons or links to enhance user interaction and improve usability.
