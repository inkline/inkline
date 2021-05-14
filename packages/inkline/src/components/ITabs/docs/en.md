---
title: Tabs
description: Tab elements are used to switch between multiple sections of related content. 
---

<script setup>
import * as examples from '../examples';
</script>

# Tabs
## Tab elements are used to switch between multiple sections of related content. 

### Example
Switching between tabs will fade-in the content associated to the selected tab. Here are some things to keep in mind:
- A specific tab can be opened by default using the `v-model` directive
- You must to assign a tab `name` to the `<i-tab>` components
- You must reference the chosen tab name using the `for` property of the `<i-tab-title>` components

<example :component="examples.ITabsBasicExample" :html="examples.ITabsBasicExampleHTML" :js="examples.ITabsBasicExampleJS"></example>

When you have a large number of tabs, the tabs header will scroll horizontally.

### Stretch Header
You can have a full width tabs header using the `stretch` property. Make sure you use it only when having a small number of tabs.

<example :component="examples.ITabsStretchExample" :html="examples.ITabsStretchExampleHTML" :js="examples.ITabsStretchExampleJS"></example>

### Size Variants
You're able to use the `size` property to control the size of your tabs, using one of the available sizes: `sm`, `md`, and `lg`. 
The default size is set to `md`.

<example :component="examples.ITabsSizeVariantsExample" :html="examples.ITabsSizeVariantsExampleHTML" :js="examples.ITabsSizeVariantsExampleJS"></example>

### Color Variants
Inkline includes basic predefined tabs styles that you can use within your application. You can apply a style using the `color` property.

<example :component="examples.ITabsColorVariantsExample" :html="examples.ITabsColorVariantsExampleHTML" :js="examples.ITabsColorVariantsExampleJS"></example>
