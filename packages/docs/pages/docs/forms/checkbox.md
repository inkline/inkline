---
title: Checkbox
description: Checkbox inputs allow the user to select multiple options from a set. 
---

# Checkbox
## Checkbox inputs allow the user to select multiple options from a set. 

Using the `i-checkbox` component together with a `i-checkbox-group` allows you to control multiple values using a single binding.

### Basic Usage

<i-code title="Basic Checkbox">
<i-tab type="preview">
    <i-checkbox v-model="checked">Apple</i-checkbox>
</i-tab>
<i-tab type="html">

~~~html
<i-checkbox v-model="checked">Apple</i-checkbox>
~~~

</i-tab>
<i-tab type="js">

~~~js
export default {
  data () {
    return {
      checked: true
    };
  }
}
~~~

</i-tab>
<i-tab type="output">

Checked: <code>{{checked}}</code>

</i-tab>
</i-code>

### Checkbox Group

<i-code title="Checkbox Group">
<i-tab type="preview">
    <i-checkbox-group v-model="checkedGroup">
        <i-checkbox value="Football">Football</i-checkbox>
        <i-checkbox value="Volleyball">Volleyball</i-checkbox>
        <i-checkbox value="Basketball">Basketball</i-checkbox>
        <i-checkbox value="Snowboarding">Snowboarding</i-checkbox>
        <i-checkbox value="Tennis" disabled>Tennis</i-checkbox>
    </i-checkbox-group>
</i-tab>
<i-tab type="html">

~~~html
<i-checkbox-group v-model="checked">
    <i-checkbox value="Football">Football</i-checkbox>
    <i-checkbox value="Volleyball">Volleyball</i-checkbox>
    <i-checkbox value="Basketball">Basketball</i-checkbox>
    <i-checkbox value="Snowboarding">Snowboarding</i-checkbox>
    <i-checkbox value="Tennis" disabled>Tennis</i-checkbox>
</i-checkbox-group>
~~~

</i-tab>
<i-tab type="js">

~~~js
export default {
  data () {
    return {
      checked: ['Football', 'Basketball', 'Tennis']
    };
  }
}
~~~

</i-tab>
<i-tab type="output">
    Checked values: <code>{{checkedGroup}}</code>
</i-tab>
</i-code>


### Sizes
You're able to use the `size` property to control the size of your inputs, using one of the available sizes: `sm`, `md`, and `lg`. The default size is set to `md`. 

<i-code title="Checkbox Sizes">
<i-tab type="preview">
    <i-checkbox-group v-model="checkedSize">
        <i-checkbox size="sm" value="Football">Football</i-checkbox>
        <i-checkbox size="md" value="Volleyball">Tennis</i-checkbox>
        <i-checkbox size="lg" value="Basketball">Basketball</i-checkbox>
    </i-checkbox-group>
</i-tab>
<i-tab type="html">

~~~html
<i-checkbox-group v-model="checked">
    <i-checkbox size="sm" value="Football">Football</i-checkbox>
    <i-checkbox size="md" value="Volleyball">Tennis</i-checkbox>
    <i-checkbox size="lg" value="Basketball">Basketball</i-checkbox>
</i-checkbox-group>
~~~

</i-tab>
<i-tab type="js">

~~~js
export default {
  data () {
    return {
      checked: ['Basketball']
    };
  }
}
~~~

</i-tab>
</i-code>

Applying the size `size` property to a `i-checkbox-group` will set the chosen size to all of its child inputs.

<i-code title="Checkbox Group Size">
<i-tab type="preview">
    <i-checkbox-group size="sm" v-model="checkedSizeGroupSm" class="_margin-bottom-1">
        <i-checkbox value="Football">Football</i-checkbox>
        <i-checkbox value="Volleyball">Volleyball</i-checkbox>
        <i-checkbox value="Basketball">Basketball</i-checkbox>
        <i-checkbox value="Tennis" disabled>Tennis</i-checkbox>
    </i-checkbox-group>
    <i-checkbox-group size="md" v-model="checkedSizeGroupMd" class="_margin-bottom-1">
        <i-checkbox value="Football">Football</i-checkbox>
        <i-checkbox value="Volleyball">Volleyball</i-checkbox>
        <i-checkbox value="Basketball">Basketball</i-checkbox>
        <i-checkbox value="Tennis" disabled>Tennis</i-checkbox>
    </i-checkbox-group>
    <i-checkbox-group size="lg" v-model="checkedSizeGroupLg">
        <i-checkbox value="Football">Football</i-checkbox>
        <i-checkbox value="Volleyball">Volleyball</i-checkbox>
        <i-checkbox value="Basketball">Basketball</i-checkbox>
        <i-checkbox value="Tennis" disabled>Tennis</i-checkbox>
    </i-checkbox-group>
</i-tab>
<i-tab type="html">

~~~html
<i-checkbox-group size="sm" v-model="checked">
    <i-checkbox value="Football">Football</i-checkbox>
    <i-checkbox value="Volleyball">Volleyball</i-checkbox>
    <i-checkbox value="Basketball">Basketball</i-checkbox>
    <i-checkbox value="Tennis" disabled>Tennis</i-checkbox>
</i-checkbox-group>
~~~
~~~html
<i-checkbox-group size="md" v-model="checked">
    <i-checkbox value="Football">Football</i-checkbox>
    <i-checkbox value="Volleyball">Volleyball</i-checkbox>
    <i-checkbox value="Basketball">Basketball</i-checkbox>
    <i-checkbox value="Tennis" disabled>Tennis</i-checkbox>
</i-checkbox-group>
~~~
~~~html
<i-checkbox-group size="lg" v-model="checked">
    <i-checkbox value="Football">Football</i-checkbox>
    <i-checkbox value="Volleyball">Volleyball</i-checkbox>
    <i-checkbox value="Basketball">Basketball</i-checkbox>
    <i-checkbox value="Tennis" disabled>Tennis</i-checkbox>
</i-checkbox-group>
~~~

</i-tab>
<i-tab type="js">

~~~js
export default {
  data () {
    return {
      checked: ['Basketball', 'Tennis']
    };
  }
}
~~~

</i-tab>
</i-code>

### Custom vs. Native
Inkline uses custom checkbox designs by setting the `custom` property to `true` by default. 

<i-code title="Custom Checkbox">
<i-tab type="preview">
    <i-checkbox-group v-model="checkedCustomTrue">
        <i-checkbox :custom="true" value="Football">Football</i-checkbox>
        <i-checkbox :custom="true" value="Volleyball">Tennis</i-checkbox>
        <i-checkbox :custom="true" value="Basketball">Basketball</i-checkbox>    
    </i-checkbox-group>
</i-tab>
<i-tab type="html">

~~~html
<i-checkbox-group v-model="checkedCustomTrue">
    <i-checkbox :custom="true" value="Football">Football</i-checkbox>
    <i-checkbox :custom="true" value="Volleyball">Tennis</i-checkbox>
    <i-checkbox :custom="true" value="Basketball">Basketball</i-checkbox>    
</i-checkbox-group>
~~~

</i-tab>
<i-tab type="js">

~~~js
export default {
  data () {
    return {
      checked: ['Basketball']
    };
  }
}
~~~

</i-tab>
</i-code>

### Indeterminate
You can set the state of a `<i-checkbox>` to be indeterminate by setting the `indeterminate` property to `true`. 

<i-code title="Indeterminate Checkbox">
<i-tab type="preview">
    <i-checkbox :indeterminate="true">Football</i-checkbox>
</i-tab>
<i-tab type="html">

~~~html
<i-checkbox :indeterminate="true">Football</i-checkbox>
~~~

</i-tab>
<i-tab type="js"> 

~~~js
export default {
  data () {
    return {
      checked: ['Basketball']
    };
  }
}
~~~

</i-tab>
</i-code>


### Checkbox Buttons

You can display your checkbox inputs as toggleable buttons using the provided `<i-checkbox-button>` and `<i-checkbox-button-group>` components.

<i-code title="Checkbox Buttons">
<i-tab type="preview">
    <i-checkbox-button-group v-model="checkedButton">
        <i-checkbox-button value="Earth">Earth</i-checkbox-button>
        <i-checkbox-button value="Mars">Mars</i-checkbox-button>
        <i-checkbox-button value="Jupiter">Jupiter</i-checkbox-button>
        <i-checkbox-button value="Venus" disabled>Venus</i-checkbox-button>
    </i-checkbox-button-group>
</i-tab>
<i-tab type="html">

~~~html
<i-checkbox-button-group v-model="checked">
    <i-checkbox-button value="Earth">Earth</i-checkbox-button>
    <i-checkbox-button value="Mars">Mars</i-checkbox-button>
    <i-checkbox-button value="Jupiter">Jupiter</i-checkbox-button>
    <i-checkbox-button value="Venus" disabled>Venus</i-checkbox-button>
</i-checkbox-button-group>
~~~

</i-tab>
<i-tab type="js">

~~~js
export default {
  data () {
    return {
      checked: ['Earth']
    };
  }
}
~~~

</i-tab>
</i-code>


### Component API
Here you can find a list of the various customization options you can use for the checkbox components as props, as well as available slots and events.

<i-code title="Checkbox API" markup="i-checkbox" expanded>
    <i-tab type="props">
        <api-table>
            <api-table-row>
                <template slot="property">custom</template>
                <template slot="description">Sets the styling of the checkbox form component to custom or native.</template>
                <template slot="type"><code>Boolean</code></template>
                <template slot="values"><code>true</code>, <code>false</code></template>
                <template slot="default"><code>true</code></template>
            </api-table-row>
            <api-table-row>
                <template slot="property">disabled</template>
                <template slot="description">Sets the state of the checkbox form component as disabled.</template>
                <template slot="type"><code>Boolean</code></template>
                <template slot="values"><code>true</code>, <code>false</code></template>
                <template slot="default"><code>false</code></template>
            </api-table-row>
            <api-table-row>
                <template slot="property">indeterminate</template>
                <template slot="description">Sets the state of the checkbox form component as indeterminate.</template>
                <template slot="type"><code>Boolean</code></template>
                <template slot="values"><code>true</code>, <code>false</code></template>
                <template slot="default"><code>false</code></template>
            </api-table-row>
            <api-table-row>
                <template slot="property">readonly</template>
                <template slot="description">Sets the state of the checkbox form component as readonly.</template>
                <template slot="type"><code>Boolean</code></template>
                <template slot="values"><code>true</code>, <code>false</code></template>
                <template slot="default"><code>false</code></template>
            </api-table-row>
            <api-table-row>
                <template slot="property">schema</template>
                <template slot="description">Provides a schema binding to the checkbox form component. See the <nuxt-link :to="{ name: 'docs-forms-validation-introduction' }">Form Validation</nuxt-link> documentation.</template>
                <template slot="type"><code>Object</code></template>
                <template slot="values"></template>
                <template slot="default"></template>
            </api-table-row>
            <api-table-row>
                <template slot="property">size</template>
                <template slot="description">Sets the size of the checkbox form component.</template>
                <template slot="type"><code>String</code></template>
                <template slot="values"><code>sm</code>, <code>md</code>, <code>lg</code></template>
                <template slot="default"><code>md</code></template>
            </api-table-row>
            <api-table-row>
                <template slot="property">value</template>
                <template slot="description">Sets the value of the checkbox form component. Can be also provided using a <code>v-model</code> directive when the checkbox isn't grouped.</template>
                <template slot="type"><code>Boolean</code>, <code>String</code></template>
                <template slot="values"></template>
                <template slot="default"></template>
            </api-table-row>
        </api-table>
    </i-tab>
    <i-tab type="slots">
        <api-table>
            <api-table-row>
                <template slot="slot">default</template>
                <template slot="description">Slot for checkbox form component label.</template>
            </api-table-row>
        </api-table>
    </i-tab>
    <i-tab type="events">
        <api-table>
            <api-table-row>
                <template slot="event">click</template>
                <template slot="description">Emitted when checkbox form component is clicked.</template>
                <template slot="type"><code>(event: Event) => {}</code></template>
            </api-table-row>
            <api-table-row>
                <template slot="event">focus</template>
                <template slot="description">Emitted when checkbox form component is focused.</template>
                <template slot="type"><code>(event: Event) => {}</code></template>
            </api-table-row>
            <api-table-row>
                <template slot="event">blur</template>
                <template slot="description">Emitted when checkbox form component is blurred.</template>
                <template slot="type"><code>(event: Event) => {}</code></template>
            </api-table-row>
            <api-table-row>
                <template slot="event">input</template>
                <template slot="description">Emitted when checkbox form component value changes.</template>
                <template slot="type"><code>(value: Boolean | String) => {}</code></template>
            </api-table-row>
        </api-table>
    </i-tab>
</i-code>

<i-code title="Checkbox Group API" markup="i-checkbox-group" expanded>
    <i-tab type="props">
        <api-table>
            <api-table-row>
                <template slot="property">disabled</template>
                <template slot="description">Sets the state of the checkbox form group component as disabled.</template>
                <template slot="type"><code>Boolean</code></template>
                <template slot="values"><code>true</code>, <code>false</code></template>
                <template slot="default"><code>false</code></template>
            </api-table-row>
            <api-table-row>
                <template slot="property">readonly</template>
                <template slot="description">Sets the state of the checkbox form group component as readonly.</template>
                <template slot="type"><code>Boolean</code></template>
                <template slot="values"><code>true</code>, <code>false</code></template>
                <template slot="default"><code>false</code></template>
            </api-table-row>
            <api-table-row>
                <template slot="property">size</template>
                <template slot="description">Sets the size of the checkbox form group component.</template>
                <template slot="type"><code>String</code></template>
                <template slot="values"><code>sm</code>, <code>md</code>, <code>lg</code></template>
                <template slot="default"><code>md</code></template>
            </api-table-row>
            <api-table-row>
                <template slot="property">value</template>
                <template slot="description">Sets the value of the checkbox form group component. To be provided using the <code>v-model</code> directive.</template>
                <template slot="type"><code>Array&lt;String&gt;</code></template>
                <template slot="values"></template>
                <template slot="default"><code>[]</code></template>
            </api-table-row>
        </api-table>
    </i-tab>
    <i-tab type="slots">
        <api-table>
            <api-table-row>
                <template slot="slot">default</template>
                <template slot="description">Slot for checkbox form group component default content.</template>
            </api-table-row>
        </api-table>
    </i-tab>
    <i-tab type="events">
        <api-table>
            <api-table-row>
                <template slot="event">focus</template>
                <template slot="description">Emitted when a child checkbox form component is focused.</template>
                <template slot="type"><code>(event: Event) => {}</code></template>
            </api-table-row>
            <api-table-row>
                <template slot="event">blur</template>
                <template slot="description">Emitted when a child checkbox form component is blurred.</template>
                <template slot="type"><code>(event: Event) => {}</code></template>
            </api-table-row>
            <api-table-row>
                <template slot="event">input</template>
                <template slot="description">Emitted when checkbox form group component value changes.</template>
                <template slot="type"><code>(value: Boolean | String) => {}</code></template>
            </api-table-row>
        </api-table>
    </i-tab>
</i-code>


### Sass Variables
Here you can find a list of the Sass variables you can use for the checkbox and radio components. If you're looking to find common variables that these rely on, you should take a look at the <nuxt-link :to="{ name: 'docs-core-sass-variables' }">Sass Variables</nuxt-link> page.

<i-code title="Checkbox" expanded>
    <i-tab type="scss">
        <api-table>
            <api-table-row>
                <template slot="property">$form-check-checkbox-border-radius</template>
                <template slot="default"><code>$border-radius</code></template>
            </api-table-row>
            <api-table-row>
                <template slot="property">$form-check-checkbox-icon-size-base</template>
                <template slot="default"><code>8px</code></template>
            </api-table-row>
            <api-table-row>
                <template slot="property">$form-check-checkbox-icon-size</template>
                <template slot="default"><code>size-map($form-check-checkbox-icon-size-base, $sizes, $size-multipliers)</code></template>
            </api-table-row>
        </api-table>
    </i-tab>
</i-code>  

<i-code title="Checkable" expanded>
    <i-tab type="scss">
        <api-table>
            <api-table-row>
                <template slot="property">$form-check-disabled-color</template>
                <template slot="default"><code>$text-muted</code></template>
            </api-table-row>
            <api-table-row>
                <template slot="property">$form-check-margin-right</template>
                <template slot="default"><code>$spacer</code></template>
            </api-table-row>
            <api-table-row>
                <template slot="property">$form-check-indicator-color</template>
                <template slot="default"><code>$color-black</code></template>
            </api-table-row>
            <api-table-row>
                <template slot="property">$form-check-indicator-checked-color</template>
                <template slot="default"><code>$color-white</code></template>
            </api-table-row>
            <api-table-row>
                <template slot="property">$form-check-indicator-active-color</template>
                <template slot="default"><code>$color-white</code></template>
            </api-table-row>
            <api-table-row>
                <template slot="property">$form-check-indicator-disabled-color</template>
                <template slot="default"><code>$color-gray-30</code></template>
            </api-table-row>
            <api-table-row>
                <template slot="property">$form-check-indicator-checked-background-color</template>
                <template slot="default"><code>$color-primary</code></template>
            </api-table-row>
            <api-table-row>
                <template slot="property">$form-check-indicator-active-background-color</template>
                <template slot="default"><code>$color-primary</code></template>
            </api-table-row>
            <api-table-row>
                <template slot="property">$form-check-indicator-disabled-background-color</template>
                <template slot="default"><code>$color-gray-40</code></template>
            </api-table-row>
            <api-table-row>
                <template slot="property">$form-check-indicator-disabled-checked-background-color-light</template>
                <template slot="default"><code>$color-gray-40</code></template>
            </api-table-row>
            <api-table-row>
                <template slot="property">$form-check-indicator-disabled-checked-background-color-dark</template>
                <template slot="default"><code>$color-gray-60</code></template>
            </api-table-row>
            <api-table-row>
                <template slot="property">$form-check-indicator-size</template>
                <template slot="default"><code>1rem</code></template>
            </api-table-row>
            <api-table-row>
                <template slot="property">$form-check-indicator-gutter</template>
                <template slot="default"><code>spacers('1/2')</code></template>
            </api-table-row>
            <api-table-row>
                <template slot="property">$form-check-indicator-margin-normalize</template>
                <template slot="default"><code>$form-check-indicator-size / 4</code></template>
            </api-table-row>
            <api-table-row>
                <template slot="property">$form-check-indicator-box-shadow</template>
                <template slot="default"><code>0 0 0 1px rgba($color-black, 0.2), inset 0 0.25rem 0.25rem rgba($color-black, 0.1)</code></template>
            </api-table-row>
            <api-table-row>
                <template slot="property">$form-check-indicator-focused-box-shadow</template>
                <template slot="default"><code>0 0 0 1px $body-background, 0 0 0.2rem 0.2rem rgba($color-primary, 0.33)</code></template>
            </api-table-row>
            <api-table-row>
                <template slot="property">$form-check-indicator-checked-box-shadow</template>
                <template slot="default"><code>none</code></template>
            </api-table-row>
            <api-table-row>
                <template slot="property">$form-check-indicator-active-box-shadow</template>
                <template slot="default"><code>none</code></template>
            </api-table-row>
            <api-table-row>
                <template slot="property">$form-check-indicator-background-size</template>
                <template slot="default"><code>0.5rem</code></template>
            </api-table-row>
            <api-table-row>
                <template slot="property">$checkable-color-for-light-variant</template>
                <template slot="default"><code>$color-for-light-variant</code></template>
            </api-table-row>
            <api-table-row>
                <template slot="property">$checkable-color-for-dark-variant</template>
                <template slot="default"><code>$color-for-dark-variant</code></template>
            </api-table-row>
            <api-table-row>
                <template slot="property">$checkable-variant-{variant}</template>
                <template slot="default"><code>checkable-variant($color-{variant})</code></template>
            </api-table-row>
            <api-table-row>
                <template slot="property">$checkable-variants</template>
<template slot="default-row">
                
~~~scss
(
    light: $checkable-variant-light,
    dark: $checkable-variant-dark
)
~~~
                
</template>
            </api-table-row>
            <api-table-row>
                <template slot="function">checkable-variant</template>
<template slot="default-row">
                
~~~scss
@function checkable-variant($variant) {
    $checkable-variant-indicator-background: $variant;
    $checkable-variant-indicator-color: $color-black;
    $checkable-variant-indicator-checked-color: $color-white;
    $checkable-variant-indicator-active-color: $color-white;
    $checkable-variant-indicator-disabled-color: $color-gray-30;
    $checkable-variant-indicator-checked-background-color: $color-primary;
    $checkable-variant-indicator-active-background-color: $color-primary;
    $checkable-variant-indicator-disabled-background-color: $color-gray-40;
    $checkable-variant-indicator-disabled-checked-background-color: variant-color-by-luminance($variant, $color-gray-40, $color-gray-60);
    $checkable-variant-indicator-box-shadow: 0 0 0 1px rgba($color-black, 0.2), inset 0 0.25rem 0.25rem rgba($color-black, 0.1) !default;
    $checkable-variant-indicator-focused-box-shadow: 0 0 0 1px $body-background, 0 0 0.2rem 0.2rem rgba($color-primary, 0.33) !default;
    $checkable-variant-indicator-checked-box-shadow: none !default;
    $checkable-variant-indicator-active-box-shadow: none !default;
    $checkable-variant-indicator-background-size: 0.5rem !default;

    $variant-map: (
        indicator-background: $checkable-variant-indicator-background,
        indicator-color: $checkable-variant-indicator-color,
        indicator-checked-color: $checkable-variant-indicator-checked-color,
        indicator-active-color: $checkable-variant-indicator-active-color,
        indicator-disabled-color: $checkable-variant-indicator-disabled-color,
        indicator-checked-background-color: $checkable-variant-indicator-checked-background-color,
        indicator-active-background-color: $checkable-variant-indicator-active-background-color,
        indicator-disabled-background-color: $checkable-variant-indicator-disabled-background-color,
        indicator-disabled-checked-background-color: $checkable-variant-indicator-disabled-checked-background-color,
        indicator-box-shadow: $checkable-variant-indicator-box-shadow,
        indicator-focused-box-shadow: $checkable-variant-indicator-focused-box-shadow,
        indicator-checked-box-shadow: $checkable-variant-indicator-checked-box-shadow,
        indicator-active-box-shadow: $checkable-variant-indicator-active-box-shadow,
        indicator-background-size: $checkable-variant-indicator-background-size
    );

    @return $variant-map;
}
~~~
</template>
            </api-table-row>
        </api-table>
    </i-tab>
</i-code>
