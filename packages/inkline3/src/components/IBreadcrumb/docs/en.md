---
title: Breadcrumb
description: Indicate the current page’s location depth using a navigation list that automatically adds separators using CSS.
---

<script setup>
import * as examples from '../examples';
</script>

# Breadcrumb

## Indicate the current page’s location depth using a navigation list that automatically adds separators using CSS.

Separators are automatically added in CSS through `::before` and `content`. You can change the separator by changing the `$breadcrumb-divider` Sass variable.

<example :component="examples.IBreadcrumbBasicExample" :html="examples.IBreadcrumbBasicExampleHTML"></example>

### Dynamically Generated
You can generate and bind breadcrumbs from your JS data using a combination of `v-for` and `v-bind` as follows:

<example :component="examples.IBreadcrumbDynamicallyGeneratedExample" :html="examples.IBreadcrumbDynamicallyGeneratedExampleHTML" :js="examples.IBreadcrumbDynamicallyGeneratedExampleJS"></example>

### Color Variants

Inkline includes predefined breadcrumb color variants, each serving its own semantic purpose, which you can control using the `color` property.

<example type="alert" :component="examples.IBreadcrumbColorVariantsExample" :html="examples.IBreadcrumbColorVariantsExampleHTML"></example>

### Size Variants
You're able to use the `size` modifier to control the text and spacing size of your breadcrumb, using one of the available sizes: `sm`, `md`, and `lg`. 

<example type="alert" :component="examples.IBreadcrumbSizeVariantsExample" :html="examples.IBreadcrumbSizeVariantsExampleHTML"></example>
