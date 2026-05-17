---
title: Media - Inkline
description: Documentation and examples for the Media component, used for creating flexible media objects that can be easily nested and repeated, such as in blog comments and tweets.
---

# Media

Documentation and examples for the Media component, used for creating flexible media objects that can be easily nested and repeated in layouts such as blog comments, tweets, or user profiles.

## Overview

The Media component provides you with a flexible layout element ideal for repetitive components that include a media element positioned alongside content. It is designed for scenarios where you need to display elements like user images or blog post images next to text.

The `Media` component in Inkline is versatile and can be easily customized to fit various use cases:
- *Nested and repeatable structures:* Perfect for components like blog comments, tweets, or threaded discussions where media elements accompany textual content.
- *Side-by-side media and content:* Display a media element (e.g., an avatar, user image, or blog post image) adjacent to descriptive text or other content.
- *Consistent layout:* Maintain a uniform design across multiple similar components by reusing the `Media` component.
- *Flexible positioning:* Easily adjust the placement of media elements relative to the content to suit your layout needs.

## Import

```ts
import { Media } from 'inkline/media';
```

:DocsImportNotice

## Usage

### Basic Usage

In its simplest form, the `Media` component is used to display a basic media object with an accompanying content section.

::DocsTabs
#preview
:DocsComponentDemo{ package="@inkline/component-media" file="examples/basic.vue" }
#code
<!-- :DocsCode{ package="@inkline/component-media" file="examples/basic.vue" } -->
::

*This example renders a `Media` component with default settings, showcasing a media element alongside content.*

### Example: Nesting Media

You can nest `Media` components to build complex, hierarchical layouts such as comment threads or nested tweets.

::DocsTabs
#preview
:DocsComponentDemo{ package="@inkline/component-media" file="examples/nesting.vue" }
#code
<!-- :DocsCode{ package="@inkline/component-media" file="examples/nesting.vue" } -->
::

*This example shows how multiple `Media` components can be nested to create a structured, repeatable layout.*

## Props

::DocsCard{ title="Media Props" }
The `Media` component does not have any specific props.
::

## Events

::DocsCard{ title="Media Events" }
The `Media` component does not emit any custom events. However, you can bind native events like `@click` to make the `Media` component interactive.
::

## Slots

::DocsCard{ title="Media Slots" }
Below is an outline of available slots for the `Media` component.

::DocsComponentSlots{ package="@inkline/component-media" component="Media" }
::
::

## Design Tokens

::DocsCard{ title="Media Design Tokens" }
Below is an outline of available design tokens for the `Media` component.

::DocsComponentDesignTokens{ package="@inkline/component-media" component="Media" }
::
::

## Accessibility

By default, Inkline aims to ensure `Media` components are accessible out of the box. However, confirm your usage aligns with these best practices and any app-specific guidelines. Here are some accessibility considerations for the `Media` component:

**ARIA roles/attributes:**
- If the `Media` component contains dynamic or important media content, consider using `aria-label` or appropriate roles (such as `role="img"` for images) to describe the content.
- When the component is used in a list (e.g., comments or tweets), ensure the container has the correct role or labeling to assist screen readers.

**Keyboard navigation:**
- For interactive media elements within the component, ensure they are focusable (e.g., using `tabindex="0"`) and operable via keyboard actions such as **Enter** or **Space**.

**Additional guidelines:**
- Always provide alternative text for images or descriptive labels for video content.
- Maintain sufficient contrast between media and background elements to support users with visual impairments.

## Best Practices

**Keep layouts consistent:**
- Use the `Media` component for repetitive, similar content to maintain a consistent look across your application.

**Leverage nesting:**
- Nest `Media` components judiciously for structured layouts like comment threads or reply chains.

**Provide context:**
- Include alternative text or descriptive labels for media elements to enhance accessibility.

**Plan for responsiveness:**
- Ensure that media elements and associated content scale gracefully across different devices and screen sizes.

