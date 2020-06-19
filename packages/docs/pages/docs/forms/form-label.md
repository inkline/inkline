---
title: Form Label
description: Form component used to add text labels to inputs. 
---

# Form Label
## Form component used to add text labels to inputs. 

### Example
You can add a label to your input by grouping an `<i-form-label>` and any input component inside an `<i-form-group>`. 

<i-code title="Basic Form Label">
<i-tab type="preview">
    <i-form-group>
        <i-form-label>Input Label Default</i-form-label>
        <i-input v-model="labelInputValue" placeholder="Type something.." />
    </i-form-group>
</i-tab>
<i-tab type="html">

~~~html
<i-form-group>
    <i-form-label>Input Label Default</i-form-label>
    <i-input v-model="value" placeholder="Type something.." />
</i-form-group>
~~~

</i-tab>
<i-tab type="js">

~~~js
export default {
  data () {
    return {
      value: ''
    };
  }
}
~~~

</i-tab>
</i-code>

### Position
You can add labels to either side of your input, and position it using the optional `inline` and `placement` properties.

<i-code title="Form Label Position">
<i-tab type="preview">
    <i-form-group>
        <i-form-label>Input Label Default</i-form-label>
        <i-input v-model="labelDefaultInputValue" placeholder="Type something.." />
    </i-form-group>
    <i-form-group inline>
        <i-form-label placement="left">Input Label Left</i-form-label>
        <i-input v-model="labelLeftInputValue" placeholder="Type something.." />
    </i-form-group>
    <i-form-group inline>
        <i-form-label placement="right">Input Label Right</i-form-label>
        <i-input v-model="labelRightInputValue" placeholder="Type something.." />
    </i-form-group>
</i-tab>
<i-tab type="html">

~~~html
<i-form-group>
    <i-form-label>Input Label Default</i-form-label>
    <i-input v-model="value" placeholder="Type something.." />
</i-form-group>
~~~
~~~html
<i-form-group inline>
    <i-form-label placement="left">Input Label Left</i-form-label>
    <i-input v-model="value" placeholder="Type something.." />
</i-form-group>
~~~
~~~html
<i-form-group inline>
    <i-form-label placement="right">Input Label Right</i-form-label>
    <i-input v-model="value" placeholder="Type something.." />
</i-form-group>
~~~

</i-tab>
<i-tab type="js">

~~~js
export default {
  data () {
    return {
      value: ''
    };
  }
}
~~~

</i-tab>
</i-code>

### Size
You're able to use the `size` property to control the size of your form labels, using one of the available sizes: `sm`, `md`, and `lg`. The default size is set to `md`. Setting the size on a `<i-form-group>` will also affect form labels.

<i-code title="Form Label Size">
<i-tab type="preview">
    <i-form-group>
        <i-form-label size="sm">Input Label Small</i-form-label>
        <i-input v-model="labelSmInputValue" placeholder="Type something.." />
    </i-form-group>
    <i-form-group>
        <i-form-label size="md">Input Label Medium</i-form-label>
        <i-input v-model="labelMdInputValue" placeholder="Type something.." />
    </i-form-group>
    <i-form-group>
        <i-form-label size="lg">Input Label Large</i-form-label>
        <i-input v-model="labelLgInputValue" placeholder="Type something.." />
    </i-form-group>
</i-tab>
<i-tab type="html">

~~~html
<i-form-group>
    <i-form-label size="sm">Input Label Small</i-form-label>
    <i-input v-model="value" placeholder="Type something.." />
</i-form-group>
~~~
~~~html
<i-form-group>
    <i-form-label size="md">Input Label Medium</i-form-label>
    <i-input v-model="value" placeholder="Type something.." />
</i-form-group>
~~~
~~~html
<i-form-group>
    <i-form-label size="lg">Input Label Large</i-form-label>
    <i-input v-model="value" placeholder="Type something.." />
</i-form-group>
~~~

</i-tab>
<i-tab type="js">

~~~js
export default {
  data () {
    return {
      value: ''
    };
  }
}
~~~

</i-tab>
</i-code>


### Component API
Here you can find a list of the various customization options you can use for the form label components as props, as well as available slots.

<i-code title="Form Label API" markup="i-form-label" expanded>
    <i-tab type="props">
        <api-table>
            <api-table-row>
                <template slot="property">placement</template>
                <template slot="description">Sets the placement of the form label component.</template>
                <template slot="type"><code>String</code></template>
                <template slot="values"><code>left</code>, <code>default</code>, <code>right</code></template>
                <template slot="default"><code>default</code></template>
            </api-table-row>
            <api-table-row>
                <template slot="property">size</template>
                <template slot="description">Sets the size of the form label component.</template>
                <template slot="type"><code>String</code></template>
                <template slot="values"><code>sm</code>, <code>md</code>, <code>lg</code></template>
                <template slot="default"><code>md</code></template>
            </api-table-row>
        </api-table>
    </i-tab>
    <i-tab type="slots">
        <api-table>
            <api-table-row>
                <template slot="slot">default</template>
                <template slot="description">Slot for form label default content.</template>
            </api-table-row>
        </api-table>
    </i-tab>
</i-code>

### Sass Variables
Here you can find a list of the Sass variables you can use for the form label component. If you're looking to find common variables that these rely on, you should take a look at the <nuxt-link :to="{ name: 'docs-core-sass-variables' }">Sass Variables</nuxt-link> page.

<i-code title="Form Label" expanded>
    <i-tab type="scss">
        <api-table>
            <api-table-row>
                <template slot="property">$label-margin-base</template>
                <template slot="default"><code>$spacer-1-4 $spacer</code></template>
            </api-table-row>
            <api-table-row>
                <template slot="property">$label-margin</template>
                <template slot="default"><code>size-map($label-margin-base, $sizes, $size-multipliers)</code></template>
            </api-table-row>
            <api-table-row>
                <template slot="property">$label-font-size</template>
                <template slot="default"><code>$font-size</code></template>
            </api-table-row>
        </api-table>
    </i-tab>
</i-code> 
