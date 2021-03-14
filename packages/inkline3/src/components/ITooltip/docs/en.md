---
title: Tooltip
description: Tooltips are useful for conveying information when an user hovers over an element.
---

<script setup>
import * as examples from '../examples';
</script>

# Tooltip
## Tooltips are useful for conveying information when an user hovers over an element.

### Basic Example
Wrap the trigger element (such as an `<i-button>`) and provide a `<template #body>` inside an `<i-tooltip>` component to create a tooltip.

<example :component="examples.ITooltipBasicExample" :html="examples.ITooltipBasicExampleHTML"></example>

### Placement
Trigger tooltips at the `top`, `bottom`, `left` or `right` of elements by using the `placement` property. 

Each position also has a `-start` or `-end` variant that sets the tooltip to the start or end of the placement instead of centering it. The possible placements are:

- `top`
- `top-start`
- `top-end`
- `bottom`
- `bottom-start`
- `bottom-end`
- `left`
- `left-start`
- `left-end`
- `right`
- `right-start`
- `right-end`

<example :component="examples.ITooltipPlacementExample" :html="examples.ITooltipPlacementExampleHTML"></example>

### Freeform
Tooltips can contain text of virtually any size. You can control the wrapping and the maximum width of the tooltip by setting `white-space: normal` and a fixed `width` property on the tooltip content.

<example :component="examples.ITooltipFreeformExample" :html="examples.ITooltipFreeformExampleHTML"></example>

### Trigger Type
You can use the `trigger` property to trigger the tooltip on `hover` or `click`. By default, tooltips are triggered on `hover`, a design decision made to improve user experience.

<i-code title="Tooltip Trigger Type">
<i-tab type="preview">
<i-tooltip trigger="click">
    <i-button>Click Tooltip</i-button>
    <template slot="body">Tooltip</template>
</i-tooltip>&nbsp;

<i-tooltip trigger="hover">
    <i-button>Hover Tooltip</i-button>
    <template slot="body">Tooltip</template>
</i-tooltip>&nbsp;

<i-tooltip trigger="focus">
    <i-button>Focus Tooltip</i-button>
    <template slot="body">Tooltip</template>
</i-tooltip>&nbsp;

<i-tooltip :trigger="['focus', 'hover']">
    <i-button>Multiple Events Tooltip</i-button>
    <template slot="body">Tooltip</template>
</i-tooltip>&nbsp;

<i-tooltip trigger="manual" v-model="manualTooltip">
    <i-button @click="manualTooltip = !manualTooltip">Manual Tooltip</i-button>
    <template slot="body">Tooltip</template>
</i-tooltip>&nbsp;

</i-tab>
<i-tab type="html">

~~~html
<i-tooltip trigger="click">
    <i-button>Click Tooltip</i-button>
    <template slot="body">Tooltip</template>
</i-tooltip>
~~~
~~~html
<i-tooltip trigger="hover">
    <i-button>Hover Tooltip</i-button>
    <template slot="body">Tooltip</template>
</i-tooltip>
~~~
~~~html
<i-tooltip trigger="focus">
    <i-button>Focus Tooltip</i-button>
    <template slot="body">Tooltip</template>
</i-tooltip>
~~~
~~~html
<i-tooltip :trigger="['focus', 'hover']">
    <i-button>Multiple Events Tooltip</i-button>
    <template slot="body">Tooltip</template>
</i-tooltip>&nbsp;
~~~
~~~html
<i-tooltip trigger="manual" v-model="visible">
    <i-button @click="visible = !visible">Manual Tooltip</i-button>
    <template slot="body">Tooltip</template>
</i-tooltip>
~~~

</i-tab>
</i-code>

### Sizes
You're able to use the `size` modifier to control the size of your tooltips, using one of the available sizes: `sm`, `md`, and `lg`. 
The default size is set to `md`.

<i-code title="Tooltip Sizes">
<i-tab type="preview">
<div>
<i-tooltip size="sm">
    <i-button>Small Tooltip</i-button>
    <template slot="body">Tooltip</template>
</i-tooltip>&nbsp;

<i-tooltip size="md">
    <i-button>Medium Tooltip</i-button>
    <template slot="body">Tooltip</template>
</i-tooltip>&nbsp;

<i-tooltip size="lg">
    <i-button>Large Tooltip</i-button>
    <template slot="body">Tooltip</template>
</i-tooltip>
</div>

</i-tab>
<i-tab type="html">

~~~html
<i-tooltip size="sm">
    <i-button>Small Tooltip</i-button>
    <template slot="body">Tooltip</template>
</i-tooltip>
~~~
~~~html
<i-tooltip size="md">
    <i-button>Medium Tooltip</i-button>
    <template slot="body">Tooltip</template>
</i-tooltip>
~~~
~~~html
<i-tooltip size="lg">
    <i-button>Large Tooltip</i-button>
    <template slot="body">Tooltip</template>
</i-tooltip>
~~~

</i-tab>
</i-code>


### Variants
Inkline includes two predefined tooltip styles, each serving its own semantic purpose. You can set the style of a `<i-tooltip>` using the `variant` property, which can have a value of `light` or `dark`. By default, tooltips use the `dark` variant.

<i-code title="Tooltip Variants">
<i-tab type="preview">
<div>
<i-tooltip variant="light">
    <i-button variant="light">Light Tooltip</i-button>
    <template slot="body">Tooltip</template>
</i-tooltip>&nbsp;

<i-tooltip variant="dark">
    <i-button variant="dark">Dark Tooltip</i-button>
    <template slot="body">Tooltip</template>
</i-tooltip>
</div>

</i-tab>
<i-tab type="html">

~~~html
<i-tooltip variant="light">
    <i-button variant="light">Light Tooltip</i-button>
    <template slot="body">Tooltip</template>
</i-tooltip>
~~~
~~~html
<i-tooltip variant="dark">
    <i-button variant="dark">Dark Tooltip</i-button>
    <template slot="body">Tooltip</template>
</i-tooltip>
~~~

</i-tab>
</i-code>

-->
