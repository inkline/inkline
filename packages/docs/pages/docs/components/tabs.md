# Tabs
## Tab elements are used to switch between multiple sections of related content. {.lead}

### Example
Switching between tabs fade in the content associated to the selected tab. 

<i-code-preview title="Tabs Example">

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

<template slot="html">

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

</template>
</i-code-preview>

### Custom Heading
You can use the `header` scoped slot to provide a custom heading for the tab items. 

<i-alert variant="info" class="-code _margin-bottom-1">
    <template slot="icon"><i-icon icon="info" class="h4"></i-icon></template>
    <p>Adding the <code>custom</code> property will disable the merged tab and header design.</p>
</i-alert>

<i-code-preview title="Custom Tabs Heading">

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

<template slot="html">

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
~~~

</div>

</template>
</i-code-preview>

### Default Open Tab
A specific tab can be opened by default, on page load, using the `v-model` directive of the `<i-tabs>` component. First, you'll need to assign an `id` to the `<i-tab>` components which will identify the open panels.
 
 <i-code-preview title="Default Open Tab">

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

<template slot="html">

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

</template>
<template slot="js">

~~~js
export default {
    data () {
        return {
            active: ['tab-2']
        };
    }
}
~~~

</template>
</i-code-preview>

### Stretch Header
You can have a full width tabs header using the `stretch` property. Make sure you use it only when having a small number of tabs.

<i-code-preview title="Stretch Tabs Header Example">

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

<template slot="html">

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

</template>
</i-code-preview>


### Color Variants
Inkline includes basic predefined tabs styles that you can use within your application. You can apply a style using the `variant` property.

<i-code-preview title="Tab Variants">

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

<template slot="html">

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
</template>
</i-code-preview>


### API

<i-api-preview title="Tabs API" markup="i-tabs" expanded link="https://github.com/inkline/inkline/tree/master/packages/inkline/src/components/Tabs">
    <template slot="props">
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
    </template>
    <template slot="slots">
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
    </template>
    <template slot="events">
        <api-table>
            <api-table-row>
                <template slot="event">input</template>
                <template slot="description">Emitted when a tab is selected.</template>
                <template slot="type"><code>(active: String) => {}</code></template>
            </api-table-row>
        </api-table>
    </template>
</i-api-preview>

<i-api-preview title="Tab Item API" markup="i-tab" expanded link="https://github.com/inkline/inkline/tree/master/packages/inkline/src/components/Tab">
    <template slot="props">
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
    </template>
    <template slot="slots">
        <api-table>
            <api-table-row>
                <template slot="slot">default</template>
                <template slot="description">Slot for tabdefault content.</template>
            </api-table-row>
        </api-table>
    </template>
</i-api-preview>
