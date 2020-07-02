---
title: Tabs
description: Tab elements are used to switch between multiple sections of related content. 
---

# Tabs
## Tab elements are used to switch between multiple sections of related content. 

### Example
Switching between tabs fade in the content associated to the selected tab. 

<i-code title="Tabs Example">
<i-tab type="preview">
<i-tabs>
    <i-tab title="Tab 1">
        Tab 1 content
    </i-tab>
    <i-tab title="Tab 2">
        Tab 2 content
    </i-tab>
    <i-tab title="Tab 3">
        Tab 3 content
    </i-tab>
</i-tabs>

</i-tab>
<i-tab type="html">

~~~html
<i-tabs>
    <i-tab title="Tab 1">
        Tab 1 content
    </i-tab>
    <i-tab title="Tab 2">
        Tab 2 content
    </i-tab>
    <i-tab title="Tab 3">
        Tab 3 content
    </i-tab>
</i-tabs>
~~~

</i-tab>
</i-code>

### Custom Heading
You can use the `header` scoped slot to provide a custom heading for the tab items. 

<i-alert variant="info" class="-code _margin-bottom-1">
    <template slot="icon"><i-icon icon="info" class="h4"></i-icon></template>
    <p>Adding the <code>custom</code> property will disable the merged tab and header design.</p>
</i-alert>

<i-code title="Custom Tabs Heading">
<i-tab type="preview">
    <i-tabs custom>
        <template v-slot:header="{ tabs, active, setActive }">
            <ul class="list -inline">
                <li v-for="tab in tabs" :key="tab.id">
                    <i-button :active="tab.id === active" @click="setActive(tab)" class="_margin-bottom-0">
                        {{ tab.title }}
                    </i-button>
                </li>
            </ul>
        </template>
        <i-tab title="Tab 1">
            Tab 1 content
        </i-tab>
        <i-tab title="Tab 2">
            Tab 2 content
        </i-tab>
        <i-tab title="Tab 3">
            Tab 3 content
        </i-tab>
    </i-tabs>
</i-tab>
<i-tab type="html">

<div v-pre>

~~~html
<i-tabs custom>
    <template v-slot:header="{ tabs, active, setActive }">
        <ul class="list -inline">
            <li v-for="tab in tabs" :key="tab.id">
                <i-button :active="tab.id === active" @click="setActive(tab)">
                    {{ tab.title }}
                </i-button>
            </li>
        </ul>
    </i-tab>
    <i-tab title="Tab 1">
        Tab 1 content
    </i-tab>
    <i-tab title="Tab 2">
        Tab 2 content
    </i-tab>
    <i-tab title="Tab 3">
        Tab 3 content
    </i-tab>
</i-tabs>
~~~

</div>

</i-tab>
</i-code>

### Default Open Tab
A specific tab can be opened by default, on page load, using the `v-model` directive of the `<i-tabs>` component. First, you'll need to assign an `id` to the `<i-tab>` components which will identify the open panels.
 
<i-code title="Default Open Tab">
<i-tab type="preview">
    <i-tabs v-model="active">
        <i-tab id="tab-1" title="Tab 1">
            Tab 1 content
        </i-tab>
        <i-tab id="tab-2" title="Tab 2">
            Tab 2 content
        </i-tab>
        <i-tab id="tab-3" title="Tab 3">
            Tab 3 content
        </i-tab>
    </i-tabs>
</i-tab>
<i-tab type="html">

~~~html
<i-tabs v-model="active">
    <i-tab id="panel-1">
        <template slot="title">Tab 1</template>
        Tab 1 content
    </i-tab>
    <i-tab id="panel-2">
        <template slot="title">Tab 2</template>
        Tab 2 content
    </i-tab>
    <i-tab id="panel-3">
        <template slot="title">Tab 3</template>
        Tab 3 content
    </i-tab>
</i-tabs>
~~~

</i-tab>
<i-tab type="js">

~~~js
export default {
    data () {
        return {
            active: ['tab-2']
        };
    }
}
~~~

</i-tab>
</i-code>

### Stretch Header
You can have a full width tabs header using the `stretch` property. Make sure you use it only when having a small number of tabs.

<i-code title="Stretch Tabs Header Example">
<i-tab type="preview">
    <i-tabs stretch>
        <i-tab title="Tab 1">
            Tab 1 content
        </i-tab>
        <i-tab title="Tab 2">
            Tab 2 content
        </i-tab>
        <i-tab title="Tab 3">
            Tab 3 content
        </i-tab>
    </i-tabs>
</i-tab>
<i-tab type="html">

~~~html
<i-tabs stretch>
    <i-tab title="Tab 1">
        Tab 1 content
    </i-tab>
    <i-tab title="Tab 2">
        Tab 2 content
    </i-tab>
    <i-tab title="Tab 3">
        Tab 3 content
    </i-tab>
</i-tabs>
~~~

</i-tab>
</i-code>


### Color Variants
Inkline includes basic predefined tabs styles that you can use within your application. You can apply a style using the `variant` property.

<i-code title="Tab Variants">
<i-tab type="preview">
    <i-tabs variant="light">
        <i-tab title="Tab 1">
            Tab 1 content
        </i-tab>
        <i-tab title="Tab 2">
            Tab 2 content
        </i-tab>
        <i-tab title="Tab 3">
            Tab 3 content
        </i-tab>
    </i-tabs>
    <div class="_margin-top-1">
        <i-tabs variant="dark">
            <i-tab title="Tab 1">
                Tab 1 content
            </i-tab>
            <i-tab title="Tab 2">
                Tab 2 content
            </i-tab>
            <i-tab title="Tab 3">
                Tab 3 content
            </i-tab>
        </i-tabs>
    </div>
</i-tab>
<i-tab type="html">

~~~html
<i-tabs variant="light">
    <i-tab title="Tab 1">
        Tab 1 content
    </i-tab>
    <i-tab title="Tab 2">
        Tab 2 content
    </i-tab>
    <i-tab title="Tab 3">
        Tab 3 content
    </i-tab>
</i-tabs>
~~~

~~~html
<i-tabs variant="dark">
    <i-tab title="Tab 1">
        Tab 1 content
    </i-tab>
    <i-tab title="Tab 2">
        Tab 2 content
    </i-tab>
    <i-tab title="Tab 3">
        Tab 3 content
    </i-tab>
</i-tabs>
~~~

~~~html
<i-tabs variant="unstyled">
    <i-tab title="Tab 1">
        Tab 1 content
    </i-tab>
    <i-tab title="Tab 2">
        Tab 2 content
    </i-tab>
    <i-tab title="Tab 3">
        Tab 3 content
    </i-tab>
</i-tabs>
~~~
</i-tab>
</i-code>


### Component API
Here you can find a list of the various customization options you can use for the tabs components as props, as well as available slots and events.

<i-code title="Tabs API" markup="i-tabs" expanded link="https://github.com/inkline/inkline/tree/master/packages/inkline/src/components/ITabs">
    <i-tab type="props">
        <api-table>
            <api-table-row>
                <template slot="property">custom</template>
                <template slot="description">Sets the tabs to have a custom design.</template>
                <template slot="type"><code>Boolean</code></template>
                <template slot="values"><code>true</code>, <code>false</code></template>
                <template slot="default"><code>false</code></template>
            </api-table-row>
            <api-table-row>
                <template slot="property">stretch</template>
                <template slot="description">Sets the tabs header to be stretched across the whole tabs body width.</template>
                <template slot="type"><code>Boolean</code></template>
                <template slot="values"><code>true</code>, <code>false</code></template>
                <template slot="default"><code>false</code></template>
            </api-table-row>
            <api-table-row>
                <template slot="property">value</template>
                <template slot="description">Sets the default active tab. To be used together with the <code>v-model</code> directive.</template>
                <template slot="type">String</template>
                <template slot="values"></template>
                <template slot="default"><code>null</code></template>
            </api-table-row>
            <api-table-row>
                <template slot="property">variant</template>
                <template slot="description">Sets the color variant of the tabs component.</template>
                <template slot="type"><code>String</code></template>
                <template slot="values"><code>light</code>, <code>dark</code>, <code>unstyled</code></template>
                <template slot="default"><code>light</code></template>
            </api-table-row>
        </api-table>
    </i-tab>
    <i-tab type="slots">
        <api-table>
            <api-table-row>
                <template slot="slot">default</template>
                <template slot="description">Slot for tabs default content.</template>
            </api-table-row>
            <api-table-row>
                <template slot="slot">header</template>
                <template slot="description">Scoped slot for tabs header.</template>
            </api-table-row>
        </api-table>
    </i-tab>
    <i-tab type="events">
        <api-table>
            <api-table-row>
                <template slot="event">input</template>
                <template slot="description">Emitted when a tab is selected.</template>
                <template slot="type"><code>(active: String) => {}</code></template>
            </api-table-row>
        </api-table>
    </i-tab>
</i-code>

<i-code title="Tab Item API" markup="i-tab" expanded link="https://github.com/inkline/inkline/tree/master/packages/inkline/src/components/ITab">
    <i-tab type="props">
        <api-table>
            <api-table-row>
                <template slot="property">title</template>
                <template slot="description">Sets the title of the tab.</template>
                <template slot="type"><code>String</code></template>
                <template slot="values"></template>
                <template slot="default"></template>
            </api-table-row>
            <api-table-row>
                <template slot="property">id</template>
                <template slot="description">Sets the identifier of the tab.</template>
                <template slot="type"><code>String</code></template>
                <template slot="values"></template>
                <template slot="default"><code>tab-&lt;uid&gt;</code></template>
            </api-table-row>
        </api-table>
    </i-tab>
    <i-tab type="slots">
        <api-table>
            <api-table-row>
                <template slot="slot">default</template>
                <template slot="description">Slot for tabdefault content.</template>
            </api-table-row>
        </api-table>
    </i-tab>
</i-code>

### Sass Variables
Here you can find a list of the Sass variables you can use for the tabs components. If you're looking to find common variables that these rely on, you should take a look at the <nuxt-link :to="{ name: 'docs-core-sass-variables' }">Sass Variables</nuxt-link> page.

<i-code title="Tabs" expanded>
    <i-tab type="scss">
        <api-table>
            <api-table-row>
                <template slot="property">$tabs-border-radius</template>
                <template slot="default"><code>$border-radius-md</code></template>
            </api-table-row>
            <api-table-row>
                <template slot="property">$tabs-body-padding</template>
                <template slot="default"><code>$spacer</code></template>
            </api-table-row>
            <api-table-row>
                <template slot="property">$tabs-color-for-light-variant</template>
                <template slot="default"><code>$color-for-light-variant</code></template>
            </api-table-row>
            <api-table-row>
                <template slot="property">$tabs-color-for-dark-variant</template>
                <template slot="default"><code>$color-for-dark-variant</code></template>
            </api-table-row>
            <api-table-row>
                <template slot="property">$tabs-variant-{variant}</template>
                <template slot="default"><code>tabs-variant($color-{variant})</code></template>
            </api-table-row>
            <api-table-row>
                <template slot="property">$tabs-variants</template>
<template slot="default-row">
                
~~~scss
(
    light: $tabs-variant-light,
    dark: $tabs-variant-dark
)
~~~
                
</template>
            </api-table-row>
            <api-table-row>
                <template slot="function">tabs-variant</template>
<template slot="default-row">
                
~~~scss
@function tabs-variant($variant) {
    $tabs-variant-color: variant-color-by-luminance($variant, $tabs-color-for-light-variant, $tabs-color-for-dark-variant);
    $tabs-variant-border-color: variant-color-by-luminance($variant, $border-color-dark, $border-color-light);
    $tabs-variant-background: $variant;

    $variant-map: (
        color: $tabs-variant-color,
        background: $tabs-variant-background,
        border-color: $tabs-variant-border-color,
    );

    @return $variant-map;
}
~~~
                
</template>
            </api-table-row>
        </api-table>
    </i-tab>
</i-code> 
