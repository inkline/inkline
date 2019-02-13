# Checkbox

Checkbox inputs allow the user to select multiple options from a set. If you have multiple options appearing in a list, 
you can preserve space by using checkboxes instead of on/off switches. If you have a single option, avoid using 
a checkbox and use an on/off switch instead. { .lead }

You will need to use the `i-checkbox` component together with a `i-checkbox-group`.

### Basic Usage

<i-code-preview title="Basic Checkbox" link="https://github.com/inkline/inkline/tree/master/src/components/Checkbox">

<i-checkbox v-model="checked">Apple</i-checkbox>

<template slot="html">

~~~html
<i-checkbox v-model="checked">Apple</i-checkbox>
~~~

</template>
<template slot="js">

~~~js
export default {
  data () {
    return {
      checked: true
    };
  }
}
~~~

</template>
<template slot="output">

Checked: <code>{{checked}}</code>

</template>
</i-code-preview>

### Checkbox Group

<i-code-preview title="Checkbox Group" link="https://github.com/inkline/inkline/tree/master/src/components/Checkbox">

<i-checkbox-group v-model="checkedGroup">
    <i-checkbox value="Football">Football</i-checkbox>
    <i-checkbox value="Volleyball">Volleyball</i-checkbox>
    <i-checkbox value="Basketball">Basketball</i-checkbox>
    <i-checkbox value="Snowboarding">Snowboarding</i-checkbox>
    <i-checkbox value="Tennis" disabled>Tennis</i-checkbox>
</i-checkbox-group>

<template slot="html">

~~~html
<i-checkbox-group v-model="checked">
    <i-checkbox value="Football">Football</i-checkbox>
    <i-checkbox value="Volleyball">Volleyball</i-checkbox>
    <i-checkbox value="Basketball">Basketball</i-checkbox>
    <i-checkbox value="Snowboarding">Snowboarding</i-checkbox>
    <i-checkbox value="Tennis" disabled>Tennis</i-checkbox>
</i-checkbox-group>
~~~

</template>
<template slot="js">

~~~js
export default {
  data () {
    return {
      checked: ['Football', 'Basketball', 'Tennis']
    };
  }
}
~~~

</template>
<template slot="output">

Checked values: <code>{{checkedGroup}}</code>

</template>
</i-code-preview>


### Sizes
You're able to use the `size` property to control the size of your inputs, using one of the available sizes: `sm`, `md`, and `lg`. The default size is set to `md`. 

<i-code-preview title="Checkbox Sizes" link="https://github.com/inkline/inkline/tree/master/src/components/Checkbox">

<i-checkbox-group v-model="checkedSize">
    <i-checkbox size="sm" value="Football">Football</i-checkbox>
    <i-checkbox size="md" value="Volleyball">Tennis</i-checkbox>
    <i-checkbox size="lg" value="Basketball">Basketball</i-checkbox>
</i-checkbox-group>

<template slot="html">

~~~html
<i-checkbox-group v-model="checked">
    <i-checkbox size="sm" value="Football">Football</i-checkbox>
    <i-checkbox size="md" value="Volleyball">Tennis</i-checkbox>
    <i-checkbox size="lg" value="Basketball">Basketball</i-checkbox>
</i-checkbox-group>
~~~

</template>
<template slot="js">

~~~js
export default {
  data () {
    return {
      checked: ['Basketball']
    };
  }
}
~~~

</template>
</i-code-preview>

Applying the size `size` property to a `i-checkbox-group` will set the chosen size to all of its child inputs.

<i-code-preview title="Checkbox Group Size" link="https://github.com/inkline/inkline/tree/master/src/components/Checkbox">

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

<template slot="html">

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

</template>
<template slot="js">

~~~js
export default {
  data () {
    return {
      checked: ['Basketball', 'Tennis']
    };
  }
}
~~~

</template>
</i-code-preview>


### Custom vs. Native
Inkline uses custom checkbox designs by setting the `custom` property to `true` by default. 

<i-code-preview title="Custom Checkbox" link="https://github.com/inkline/inkline/tree/master/src/components/Checkbox">

<i-checkbox-group v-model="checkedCustomTrue">
    <i-checkbox :custom="true" value="Football">Football</i-checkbox>
    <i-checkbox :custom="true" value="Volleyball">Tennis</i-checkbox>
    <i-checkbox :custom="true" value="Basketball">Basketball</i-checkbox>    
</i-checkbox-group>

<template slot="html">

~~~html
<i-checkbox-group v-model="checkedCustomTrue">
    <i-checkbox :custom="true" value="Football">Football</i-checkbox>
    <i-checkbox :custom="true" value="Volleyball">Tennis</i-checkbox>
    <i-checkbox :custom="true" value="Basketball">Basketball</i-checkbox>    
</i-checkbox-group>
~~~

</template>
<template slot="js">

~~~js
export default {
  data () {
    return {
      checked: ['Basketball']
    };
  }
}
~~~

</template>
</i-code-preview>

### Indeterminate
You can set the state of a `<i-checkbox>` to be indeterminate by setting the `indeterminate` property to `true`. 

<i-code-preview title="Indeterminate Checkbox" link="https://github.com/inkline/inkline/tree/master/src/components/Checkbox">

<i-checkbox :indeterminate="true">Football</i-checkbox>

<template slot="html">

~~~html
<i-checkbox :indeterminate="true">Football</i-checkbox>
~~~

</template>
<template slot="js"> 

~~~js
export default {
  data () {
    return {
      checked: ['Basketball']
    };
  }
}
~~~

</template>
</i-code-preview>


### Checkbox Buttons

You can display your checkbox inputs as toggleable buttons using the provided `<i-checkbox-button>` and `<i-checkbox-button-group>` components.

<i-code-preview title="Checkbox Buttons" link="https://github.com/inkline/inkline/tree/master/src/components/CheckboxButton">

<i-checkbox-button-group v-model="checkedButton">
    <i-checkbox-button value="Earth">Earth</i-checkbox-button>
    <i-checkbox-button value="Mars">Mars</i-checkbox-button>
    <i-checkbox-button value="Jupiter">Jupiter</i-checkbox-button>
    <i-checkbox-button value="Venus" disabled>Venus</i-checkbox-button>
</i-checkbox-button-group>

<template slot="html">

~~~html
<i-checkbox-button-group v-model="checked">
    <i-checkbox-button value="Earth">Earth</i-checkbox-button>
    <i-checkbox-button value="Mars">Mars</i-checkbox-button>
    <i-checkbox-button value="Jupiter">Jupiter</i-checkbox-button>
    <i-checkbox-button value="Venus" disabled>Venus</i-checkbox-button>
</i-checkbox-button-group>
~~~

</template>
<template slot="js">

~~~js
export default {
  data () {
    return {
      checked: ['Earth']
    };
  }
}
~~~

</template>
</i-code-preview>

### API

<i-api-preview title="Checkbox API" markup="i-checkbox" expanded>
    <template slot="props">
        <table class="table -bordered">
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
                    <td>Sets the styling of the checkbox form component to custom or native.</td>
                    <td><code>Boolean</code></td>
                    <td><code>true</code>, <code>false</code></td>
                    <td><code>true</code></td>
                </tr>
                <tr>
                    <td>disabled</td>
                    <td>Sets the state of the checkbox form component as disabled.</td>
                    <td><code>Boolean</code></td>
                    <td><code>true</code>, <code>false</code></td>
                    <td><code>false</code></td>
                </tr>
                <tr>
                    <td>indeterminate</td>
                    <td>Sets the state of the checkbox form component as indeterminate.</td>
                    <td><code>Boolean</code></td>
                    <td><code>true</code>, <code>false</code></td>
                    <td><code>false</code></td>
                </tr>
                <tr>
                    <td>readonly</td>
                    <td>Sets the state of the checkbox form component as readonly.</td>
                    <td><code>Boolean</code></td>
                    <td><code>true</code>, <code>false</code></td>
                    <td><code>false</code></td>
                </tr>
                <tr>
                    <td>schema</td>
                    <td>Provides a schema binding to the checkbox form component. See the <nuxt-link to="/docs/forms/form-validation">Form Validation</nuxt-link> documentation.</td>
                    <td><code>Object</code></td>
                    <td></td>
                    <td></td>
                </tr>
                <tr>
                    <td>size</td>
                    <td>Sets the size of the checkbox form component.</td>
                    <td><code>String</code></td>
                    <td><code>sm</code>, <code>md</code>, <code>lg</code></td>
                    <td><code>md</code></td>
                </tr>
                <tr>
                    <td>value</td>
                    <td>Sets the value of the checkbox form component. Can be also provided using a <code>v-model</code> directive when the checkbox isn't grouped.</td>
                    <td><code>Boolean</code>, <code>String</code></td>
                    <td></td>
                    <td></td>
                </tr>
            </tbody>
        </table>
    </template>
    <template slot="slots">
        <table class="table -bordered _margin-bottom-0">
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Description</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>default</td>
                    <td>Slot for checkbox form component label.</td>
                </tr>
            </tbody>
        </table>
    </template>
    <template slot="events">
        <table class="table -bordered _margin-bottom-0">
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Description</th>
                    <th>Prototype</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>click</td>
                    <td>Emitted when checkbox form component is clicked.</td>
                    <td><code>(event: Event) => {}</code></td>
                </tr>
                <tr>
                    <td>focus</td>
                    <td>Emitted when checkbox form component is focused.</td>
                    <td><code>(event: Event) => {}</code></td>
                </tr>
                <tr>
                    <td>blur</td>
                    <td>Emitted when checkbox form component is blurred.</td>
                    <td><code>(event: Event) => {}</code></td>
                </tr>
                <tr>
                    <td>input</td>
                    <td>Emitted when checkbox form component value changes.</td>
                    <td><code>(value: Boolean | String) => {}</code></td>
                </tr>
            </tbody>
        </table>
    </template>
</i-api-preview>

<i-api-preview title="Checkbox Group API" markup="i-checkbox-group" expanded>
    <template slot="props">
        <table class="table -bordered">
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
                    <td>disabled</td>
                    <td>Sets the state of the checkbox form group component as disabled.</td>
                    <td><code>Boolean</code></td>
                    <td><code>true</code>, <code>false</code></td>
                    <td><code>false</code></td>
                </tr>
                <tr>
                    <td>readonly</td>
                    <td>Sets the state of the checkbox form group component as readonly.</td>
                    <td><code>Boolean</code></td>
                    <td><code>true</code>, <code>false</code></td>
                    <td><code>false</code></td>
                </tr>
                <tr>
                    <td>size</td>
                    <td>Sets the size of the checkbox form group component.</td>
                    <td><code>String</code></td>
                    <td><code>sm</code>, <code>md</code>, <code>lg</code></td>
                    <td><code>md</code></td>
                </tr>
                <tr>
                    <td>value</td>
                    <td>Sets the value of the checkbox form group component. To be provided using the <code>v-model</code> directive.</td>
                    <td><code>Array&lt;String&gt;</code></td>
                    <td></td>
                    <td><code>[]</code></td>
                </tr>
            </tbody>
        </table>
    </template>
    <template slot="slots">
        <table class="table -bordered _margin-bottom-0">
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Description</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>default</td>
                    <td>Slot for checkbox form group component default content.</td>
                </tr>
            </tbody>
        </table>
    </template>
    <template slot="events">
        <table class="table -bordered _margin-bottom-0">
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Description</th>
                    <th>Prototype</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>focus</td>
                    <td>Emitted when a child checkbox form component is focused.</td>
                    <td><code>(event: Event) => {}</code></td>
                </tr>
                <tr>
                    <td>blur</td>
                    <td>Emitted when a child checkbox form component is blurred.</td>
                    <td><code>(event: Event) => {}</code></td>
                </tr>
                <tr>
                    <td>input</td>
                    <td>Emitted when checkbox form group component value changes.</td>
                    <td><code>(value: Boolean | String) => {}</code></td>
                </tr>
            </tbody>
        </table>
    </template>
</i-api-preview>
