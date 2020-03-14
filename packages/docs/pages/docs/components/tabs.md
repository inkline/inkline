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

<template slot="html" v-pre>

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
        <i-table bordered responsive>
            <thead>
                <tr>
                    <th>Property</th>
                    <th>Description</th>
                    <th>Type</th>
                    <th>Accepted</th>
                    <th>Default</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>custom</td>
                    <td>Sets the tabs to have a custom design.</td>
                    <td><code>Boolean</code></td>
                    <td><code>true</code>, <code>false</code></td>
                    <td><code>false</code></td>
                </tr>
                <tr>
                    <td>stretch</td>
                    <td>Sets the tabs header to be stretched across the whole tabs body width.</td>
                    <td><code>Boolean</code></td>
                    <td><code>true</code>, <code>false</code></td>
                    <td><code>false</code></td>
                </tr>
                <tr>
                    <td>value</td>
                    <td>Sets the default active tab. To be used together with the <code>v-model</code> directive.</td>
                    <td>String</td>
                    <td></td>
                    <td><code>null</code></td>
                </tr>
                <tr>
                    <td>variant</td>
                    <td>Sets the color variant of the tabs component.</td>
                    <td><code>String</code></td>
                    <td><code>light</code>, <code>dark</code>, <code>unstyled</code></td>
                    <td><code>light</code></td>
                </tr>
            </tbody>
        </i-table>
    </template>
    <template slot="slots">
        <i-table bordered responsive class="_margin-bottom-0">
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Description</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>default</td>
                    <td>Slot for tabs default content.</td>
                </tr>
                <tr>
                    <td>header</td>
                    <td>Scoped slot for tabs header.</td>
                </tr>
            </tbody>
        </i-table>
    </template>
    <template slot="events">
        <i-table bordered responsive class="_margin-bottom-0">
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Description</th>
                    <th>Prototype</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>input</td>
                    <td>Emitted when a tab is selected.</td>
                    <td><code>(active: String) => {}</code></td>
                </tr>
            </tbody>
        </i-table>
    </template>
</i-api-preview>

<i-api-preview title="Tab Item API" markup="i-tab" expanded link="https://github.com/inkline/inkline/tree/master/packages/inkline/src/components/Tab">
    <template slot="props">
        <i-table bordered responsive>
            <thead>
                <tr>
                    <th>Property</th>
                    <th>Description</th>
                    <th>Type</th>
                    <th>Accepted</th>
                    <th>Default</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>title</td>
                    <td>Sets the title of the tab.</td>
                    <td><code>String</code></td>
                    <td></td>
                    <td></td>
                </tr>
                <tr>
                    <td>id</td>
                    <td>Sets the identifier of the tab.</td>
                    <td><code>String</code></td>
                    <td></td>
                    <td><code>tab-&lt;uid&gt;</code></td>
                </tr>
            </tbody>
        </i-table>
    </template>
    <template slot="slots">
        <i-table bordered responsive class="_margin-bottom-0">
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Description</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>default</td>
                    <td>Slot for tabdefault content.</td>
                </tr>
            </tbody>
        </i-table>
    </template>
</i-api-preview>
