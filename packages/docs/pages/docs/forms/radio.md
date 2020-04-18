# Radio
## Radio inputs allow the user to select one option from a set of options. { .lead }
 
Typically, there should not be too many options. Make sure you use a select input if you think the user doesn't need to see all the available options side-by-side.

You will need to use the `i-radio` component together with a `i-radio-group`.

### Basic Usage

<i-code-preview title="Radio Group">

<i-radio-group v-model="selectedGroup">
    <i-radio value="Football">Football</i-radio>
    <i-radio value="Voleyball">Voleyball</i-radio>
    <i-radio value="Basketball">Basketball</i-radio>
    <i-radio value="Tennis" disabled>Tennis</i-radio>
</i-radio-group>

<template slot="html">

~~~html
<i-radio-group v-model="selected">
    <i-radio value="Football">Football</i-radio>
    <i-radio value="Voleyball">Voleyball</i-radio>
    <i-radio value="Basketball">Basketball</i-radio>
    <i-radio value="Tennis" disabled>Tennis</i-radio>
</i-radio-group>
~~~

</template>
<template slot="js">

~~~js
export default {
  data () {
    return {
      selected: 'Football'
    };
  }
}
~~~

</template>
<template slot="output">

Selected value: <code>{{selectedGroup}}</code>

</template>
</i-code-preview>


### Sizes
You're able to use the `size` property to control the size of your inputs, using one of the available sizes: `sm`, `md`, and `lg`. The default size is set to `md`. 


<i-code-preview title="Radio Sizes">

<i-radio-group v-model="selectedSize">
    <i-radio size="sm" value="Football">Football</i-radio>
    <i-radio size="md" value="Volleyball">Tennis</i-radio>
    <i-radio size="lg" value="Basketball">Basketball</i-radio>
</i-radio-group>

<template slot="html">

~~~html
<i-radio-group v-model="selected">
    <i-radio size="sm" value="Football">Football</i-radio>
    <i-radio size="md" value="Volleyball">Tennis</i-radio>
    <i-radio size="lg" value="Basketball">Basketball</i-radio>
</i-radio-group>
~~~

</template>
<template slot="js">

~~~js
export default {
  data () {
    return {
      selected: ['Basketball']
    };
  }
}
~~~

</template>
</i-code-preview>

Applying the size `size` property to a `i-radio-group` will set the chosen size to all of its child inputs.


<i-code-preview title="Radio Group Sizes">

<i-radio-group size="sm" v-model="selectedSizeGroupSm" class="_margin-bottom-1">
    <i-radio value="Football">Football</i-radio>
    <i-radio value="Volleyball">Tennis</i-radio>
    <i-radio value="Basketball">Basketball</i-radio>
    <i-radio value="Tennis" disabled>Tennis</i-radio>
</i-radio-group>

<i-radio-group size="md" v-model="selectedSizeGroupMd" class="_margin-bottom-1">
    <i-radio value="Football">Football</i-radio>
    <i-radio value="Volleyball">Tennis</i-radio>
    <i-radio value="Basketball">Basketball</i-radio>
    <i-radio value="Tennis" disabled>Tennis</i-radio>
</i-radio-group>

<i-radio-group size="lg" v-model="selectedSizeGroupLg">
    <i-radio value="Football">Football</i-radio>
    <i-radio value="Volleyball">Tennis</i-radio>
    <i-radio value="Basketball">Basketball</i-radio>
    <i-radio value="Tennis" disabled>Tennis</i-radio>
</i-radio-group>


<template slot="html">

~~~html
<i-radio-group size="sm" v-model="selected">
    <i-radio value="Football">Football</i-radio>
    <i-radio value="Volleyball">Tennis</i-radio>
    <i-radio value="Basketball">Basketball</i-radio>
    <i-radio value="Tennis" disabled>Tennis</i-radio>
</i-radio-group>
~~~
~~~html
<i-radio-group size="md" v-model="selected">
    <i-radio value="Football">Football</i-radio>
    <i-radio value="Volleyball">Tennis</i-radio>
    <i-radio value="Basketball">Basketball</i-radio>
    <i-radio value="Tennis" disabled>Tennis</i-radio>
</i-radio-group>
~~~
~~~html
<i-radio-group size="lg" v-model="selected">
    <i-radio value="Football">Football</i-radio>
    <i-radio value="Volleyball">Tennis</i-radio>
    <i-radio value="Basketball">Basketball</i-radio>
    <i-radio value="Tennis" disabled>Tennis</i-radio>
</i-radio-group>
~~~

</template>
<template slot="js">

~~~js
export default {
  data () {
    return {
      selected: ['Basketball']
    };
  }
}
~~~

</template>
</i-code-preview>


### Custom vs. Native
Inkline uses custom radio designs by setting the `custom` property to `true` by default. 

<i-code-preview title="Custon Radio Input">

<i-radio-group v-model="selectedCustomTrue">
    <i-radio :custom="true" value="Football">Football</i-radio>
    <i-radio :custom="true" value="Volleyball">Tennis</i-radio>
    <i-radio :custom="true" value="Basketball">Basketball</i-radio>    
</i-radio-group>

<template slot="html">

~~~html
<i-radio-group v-model="selectedCustomTrue">
    <i-radio :custom="true" value="Football">Football</i-radio>
    <i-radio :custom="true" value="Volleyball">Tennis</i-radio>
    <i-radio :custom="true" value="Basketball">Basketball</i-radio>    
</i-radio-group>
~~~

</template>
<template slot="js">

~~~js
export default {
  data () {
    return {
      selected: ['Basketball']
    };
  }
}
~~~

</template>
</i-code-preview>

By setting the `custom` property to `false`, the radios use the browser's default design. 


<i-code-preview title="Native Radio Input">

<i-radio-group v-model="selectedCustomFalse">
    <i-radio :custom="false" value="Football">Football</i-radio>
    <i-radio :custom="false" value="Volleyball">Tennis</i-radio>
    <i-radio :custom="false" value="Basketball">Basketball</i-radio>
</i-radio-group>

<template slot="html">

~~~html
<i-radio-group v-model="selected">
    <i-radio :custom="false" value="Football">Football</i-radio>
    <i-radio :custom="false" value="Volleyball">Tennis</i-radio>
    <i-radio :custom="false" value="Basketball">Basketball</i-radio>
</i-radio-group>
~~~

</template>
<template slot="js">

~~~js
export default {
  data () {
    return {
      selected: ['Basketball']
    };
  }
}
~~~

</template>
</i-code-preview>

### Radio Buttons

You can display your radio inputs as toggleable buttons using the provided `<i-radio-button>` and `<i-radio-button-group>` components.

<i-code-preview title="Radio Button Group">

<i-radio-button-group v-model="selectedButton">
    <i-radio-button value="Earth">Earth</i-radio-button>
    <i-radio-button value="Mars">Mars</i-radio-button>
    <i-radio-button value="Jupiter">Jupiter</i-radio-button>
    <i-radio-button value="Venus" disabled>Venus</i-radio-button>
</i-radio-button-group>

<template slot="html">

~~~html
<i-radio-button-group v-model="selected">
    <i-radio-button value="Earth">Earth</i-radio-button>
    <i-radio-button value="Mars">Mars</i-radio-button>
    <i-radio-button value="Jupiter">Jupiter</i-radio-button>
    <i-radio-button value="Venus" disabled>Venus</i-radio-button>
</i-radio-button-group>
~~~

</template>
<template slot="js">

~~~js
export default {
  data () {
    return {
      selected: 'Earth'
    };
  }
}
~~~

</template>
</i-code-preview>


### Component API
Here you can find a list of the various customization options you can use for the radio components as props, as well as available slots and events.

<i-api-preview title="Radio API" markup="i-radio" expanded>
    <template slot="props">
        <api-table>
            <api-table-row>
                <template slot="property">custom</template>
                <template slot="description">Sets the styling of the radio form component to custom or native.</template>
                <template slot="type"><code>Boolean</code></template>
                <template slot="values"><code>true</code>, <code>false</code></template>
                <template slot="default"><code>true</code></template>
            </api-table-row>
            <api-table-row>
                <template slot="property">disabled</template>
                <template slot="description">Sets the state of the radio form component as disabled.</template>
                <template slot="type"><code>Boolean</code></template>
                <template slot="values"><code>true</code>, <code>false</code></template>
                <template slot="default"><code>false</code></template>
            </api-table-row>
            <api-table-row>
                <template slot="property">indeterminate</template>
                <template slot="description">Sets the state of the radio form component as indeterminate.</template>
                <template slot="type"><code>Boolean</code></template>
                <template slot="values"><code>true</code>, <code>false</code></template>
                <template slot="default"><code>false</code></template>
            </api-table-row>
            <api-table-row>
                <template slot="property">readonly</template>
                <template slot="description">Sets the state of the radio form component as readonly.</template>
                <template slot="type"><code>Boolean</code></template>
                <template slot="values"><code>true</code>, <code>false</code></template>
                <template slot="default"><code>false</code></template>
            </api-table-row>
            <api-table-row>
                <template slot="property">schema</template>
                <template slot="description">Provides a schema binding to the radio form component. See the <nuxt-link to="/docs/forms/form-validation">Form Validation</nuxt-link> documentation.</template>
                <template slot="type"><code>Object</code></template>
                <template slot="values"></template>
                <template slot="default"></template>
            </api-table-row>
            <api-table-row>
                <template slot="property">size</template>
                <template slot="description">Sets the size of the radio form component.</template>
                <template slot="type"><code>String</code></template>
                <template slot="values"><code>sm</code>, <code>md</code>, <code>lg</code></template>
                <template slot="default"><code>md</code></template>
            </api-table-row>
            <api-table-row>
                <template slot="property">value</template>
                <template slot="description">Sets the value of the radio form component.</template>
                <template slot="type"><code>String</code></template>
                <template slot="values"></template>
                <template slot="default"></template>
            </api-table-row>
        </api-table>
    </template>
    <template slot="slots">
        <api-table>
            <api-table-row>
                <template slot="slot">default</template>
                <template slot="description">Slot for radio form component label.</template>
            </api-table-row>
        </api-table>
    </template>
    <template slot="events">
        <api-table>
            <api-table-row>
                <template slot="event">click</template>
                <template slot="description">Emitted when radio form component is clicked.</template>
                <template slot="type"><code>(event: Event) => {}</code></template>
            </api-table-row>
            <api-table-row>
                <template slot="event">focus</template>
                <template slot="description">Emitted when radio form component is focused.</template>
                <template slot="type"><code>(event: Event) => {}</code></template>
            </api-table-row>
            <api-table-row>
                <template slot="event">blur</template>
                <template slot="description">Emitted when radio form component is blurred.</template>
                <template slot="type"><code>(event: Event) => {}</code></template>
            </api-table-row>
            <api-table-row>
                <template slot="event">input</template>
                <template slot="description">Emitted when radio form component value changes.</template>
                <template slot="type"><code>(value: String) => {}</code></template>
            </api-table-row>
        </api-table>
    </template>
</i-api-preview>

<i-api-preview title="Radio Group API" markup="i-radio-group" expanded>
    <template slot="props">
        <api-table>
            <api-table-row>
                <template slot="property">disabled</template>
                <template slot="description">Sets the state of the radio form group component as disabled.</template>
                <template slot="type"><code>Boolean</code></template>
                <template slot="values"><code>true</code>, <code>false</code></template>
                <template slot="default"><code>false</code></template>
            </api-table-row>
            <api-table-row>
                <template slot="property">readonly</template>
                <template slot="description">Sets the state of the radio form group component as readonly.</template>
                <template slot="type"><code>Boolean</code></template>
                <template slot="values"><code>true</code>, <code>false</code></template>
                <template slot="default"><code>false</code></template>
            </api-table-row>
            <api-table-row>
                <template slot="property">size</template>
                <template slot="description">Sets the size of the radio form group component.</template>
                <template slot="type"><code>String</code></template>
                <template slot="values"><code>sm</code>, <code>md</code>, <code>lg</code></template>
                <template slot="default"><code>md</code></template>
            </api-table-row>
            <api-table-row>
                <template slot="property">value</template>
                <template slot="description">Sets the value of the radio form group component. To be provided using the <code>v-model</code> directive.</template>
                <template slot="type"><code>String</code></template>
                <template slot="values"></template>
                <template slot="default"></template>
            </api-table-row>
        </api-table>
    </template>
    <template slot="slots">
        <api-table>
            <api-table-row>
                <template slot="slot">default</template>
                <template slot="description">Slot for radio form group component default content.</template>
            </api-table-row>
        </api-table>
    </template>
    <template slot="events">
        <api-table>
            <api-table-row>
                <template slot="event">focus</template>
                <template slot="description">Emitted when a child radio form component is focused.</template>
                <template slot="type"><code>(event: Event) => {}</code></template>
            </api-table-row>
            <api-table-row>
                <template slot="event">blur</template>
                <template slot="description">Emitted when a child radio form component is blurred.</template>
                <template slot="type"><code>(event: Event) => {}</code></template>
            </api-table-row>
            <api-table-row>
                <template slot="event">input</template>
                <template slot="description">Emitted when radio form group component value changes.</template>
                <template slot="type"><code>(value: String) => {}</code></template>
            </api-table-row>
        </api-table>
    </template>
</i-api-preview>


### Sass Variables
Here you can find a list of the Sass variables you can use for the checkbox and radio components. If you're looking to find common variables that these rely on, you should take a look at the <nuxt-link :to="{ name: 'docs-introduction-sass-variables' }">Sass Variables</nuxt-link> page.

<i-scss-preview title="Radio" expanded>
    <template slot="scss">
        <api-table>
            <api-table-row>
                <template slot="property">$form-check-radio-border-radius </template>
                <template slot="default"><code>100%</code></template>
            </api-table-row>
            <api-table-row>
                <template slot="property">$form-check-radio-icon-size-base </template>
                <template slot="default"><code>8px</code></template>
            </api-table-row>
            <api-table-row>
                <template slot="property">$form-check-radio-icon-size </template>
                <template slot="default"><code>size-map($form-check-radio-icon-size-base, $sizes, $size-multipliers)</code></template>
            </api-table-row>
        </api-table>
    </template>
</i-scss-preview>  
<i-scss-preview title="Checkable" expanded>
    <template slot="scss">
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
                <template slot="property">$form-check-variants</template>
                <template slot="default"><code>('monochrome-white')</code></template>
            </api-table-row>
        </api-table>
    </template>
</i-scss-preview>
