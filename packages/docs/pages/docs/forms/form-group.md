---
title: Form Group
description: Form groups are the easiest way to add structure to form elements. 
---

# Form Group
## Form groups are the easiest way to add structure to form elements. 

### Example
The `<i-form-group>` component is a wrapper that provides proper grouping of labels, input, help text, and form validation messaging. By default, form groups add a `margin-bottom` to provide spacing between form groups.

<i-code title="Basic Form Group">
<i-tab type="preview">
    <i-form-group>
        <i-form-label>Input</i-form-label>
        <i-input v-model="input" placeholder="Type something.." />
    </i-form-group>
    <i-form-group>
        <i-form-label>Textarea</i-form-label>
        <i-textarea v-model="textarea" placeholder="Write a comment.." />
    </i-form-group>
    <i-form-group>
        <i-form-label>Select</i-form-label>
        <i-select v-model="select" placeholder="Choose an option">
            <i-select-option value="a" label="Option A" />
            <i-select-option value="b" label="Option B" />
            <i-select-option value="c" label="Option C" disabled />
        </i-select>
    </i-form-group>
    <i-form-group>
        <i-form-label>Checkbox</i-form-label>
        <i-checkbox-group v-model="checkbox">
            <i-checkbox value="Football">Football</i-checkbox>
            <i-checkbox value="Volleyball">Volleyball</i-checkbox>
            <i-checkbox value="Tennis" disabled>Tennis</i-checkbox>
        </i-checkbox-group>
    </i-form-group>
    <i-form-group>
        <i-form-label>Radio</i-form-label>
        <i-radio-group v-model="radio">
            <i-radio value="Accept">Accept</i-radio>
            <i-radio value="Decline">Decline</i-radio>
        </i-radio-group>
    </i-form-group>
</i-tab>
<i-tab type="html">

~~~html
<i-form-group>
    <i-form-label>Input</i-form-label>
    <i-input v-model="input" placeholder="Type something.." />
</i-form-group>

<i-form-group>
    <i-form-label>Textarea</i-form-label>
    <i-textarea v-model="textarea" placeholder="Write a comment.." />
</i-form-group>

<i-form-group>
    <i-form-label>Select</i-form-label>
    <i-select v-model="select" placeholder="Choose an option">
        <i-select-option value="a" label="Option A" />
        <i-select-option value="b" label="Option B" />
        <i-select-option value="c" label="Option C" disabled />
    </i-select>
</i-form-group>

<i-form-group>
    <i-form-label>Checkbox</i-form-label>
    <i-checkbox-group v-model="checkbox">
        <i-checkbox value="Football">Football</i-checkbox>
        <i-checkbox value="Volleyball">Volleyball</i-checkbox>
        <i-checkbox value="Tennis" disabled>Tennis</i-checkbox>
    </i-checkbox-group>
</i-form-group>

<i-form-group>
    <i-form-label>Radio</i-form-label>
    <i-radio-group v-model="radio">
        <i-radio value="Accept">Accept</i-radio>
        <i-radio value="Decline">Decline</i-radio>
    </i-radio-group>
</i-form-group>
~~~

</i-tab>
<i-tab type="js">

~~~js
export default {
  data () {
    return {
      input: '',
      textarea: '',
      select: '',
      checkbox: ['Football'],
      radio: 'Decline',
    };
  }
}
~~~

</i-tab>
</i-code>

### Disabled State
Setting a form group as `disabled` will cause all of its child inputs to be disabled.


<i-code title="Disabled Form Group">
<i-tab type="preview">
    <i-form-group disabled>
        <i-form-label>Input</i-form-label>
        <i-input v-model="inputDisabled" placeholder="Type something.." />
    </i-form-group>
    <i-form-group disabled>
        <i-form-label>Textarea</i-form-label>
        <i-textarea v-model="textareaDisabled" placeholder="Write a comment.." />
    </i-form-group>
    <i-form-group disabled>
        <i-form-label>Select</i-form-label>
        <i-select v-model="selectDisabled" placeholder="Choose an option">
            <i-select-option value="a" label="Option A" />
            <i-select-option value="b" label="Option B" />
            <i-select-option value="c" label="Option C" disabled />
        </i-select>
    </i-form-group>
    <i-form-group disabled>
        <i-form-label>Checkbox</i-form-label>
        <i-checkbox-group v-model="checkboxDisabled">
            <i-checkbox value="Football">Football</i-checkbox>
            <i-checkbox value="Volleyball">Volleyball</i-checkbox>
            <i-checkbox value="Tennis" disabled>Tennis</i-checkbox>
        </i-checkbox-group>
    </i-form-group>
    <i-form-group disabled>
        <i-form-label>Radio</i-form-label>
        <i-radio-group v-model="radioDisabled">
            <i-radio value="Accept">Accept</i-radio>
            <i-radio value="Decline">Decline</i-radio>
        </i-radio-group>
    </i-form-group>
</i-tab>
<i-tab type="html">

~~~html
<i-form-group disabled>
    <i-form-label>Input</i-form-label>
    <i-input v-model="input" placeholder="Type something.." />
</i-form-group>

<i-form-group disabled>
    <i-form-label>Textarea</i-form-label>
    <i-textarea v-model="textarea" placeholder="Write a comment.." />
</i-form-group>

<i-form-group disabled>
    <i-form-label>Select</i-form-label>
    <i-select v-model="select" placeholder="Choose an option">
        <i-select-option value="a" label="Option A" />
        <i-select-option value="b" label="Option B" />
        <i-select-option value="c" label="Option C" disabled />
    </i-select>
</i-form-group>

<i-form-group disabled>
    <i-form-label>Checkbox</i-form-label>
    <i-checkbox-group v-model="checkbox">
        <i-checkbox value="Football">Football</i-checkbox>
        <i-checkbox value="Volleyball">Volleyball</i-checkbox>
        <i-checkbox value="Tennis" disabled>Tennis</i-checkbox>
    </i-checkbox-group>
</i-form-group>

<i-form-group disabled>
    <i-form-label>Radio</i-form-label>
    <i-radio-group v-model="radio">
        <i-radio value="Accept">Accept</i-radio>
        <i-radio value="Decline">Decline</i-radio>
    </i-radio-group>
</i-form-group>
~~~

</i-tab>
<i-tab type="js">

~~~js
export default {
  data () {
    return {
      input: '',
      textarea: '',
      select: '',
      checkbox: ['Football'],
      radio: 'Decline'
    };
  }
}
~~~

</i-tab>
</i-code>

### Sizes
You're able to use the `size` modifier to control the size of the components inside your `<i-form-group>`, using one of the available sizes: `sm`, `md`, and `lg`. The default size is set to `md`. 

All of the components inside the `<i-form-group>` will inherit the parent form group's size.

<i-code title="Small Form Group">
<i-tab type="preview">
    <i-form-group size="sm">
        <i-form-label>Input</i-form-label>
        <i-input v-model="inputSizeSm" placeholder="Type something.." />
    </i-form-group>
    <i-form-group size="sm">
        <i-form-label>Textarea</i-form-label>
        <i-textarea v-model="textareaSizeSm" placeholder="Write a comment.." />
    </i-form-group>
    <i-form-group size="sm">
        <i-form-label>Select</i-form-label>
        <i-select v-model="selectSizeSm" placeholder="Choose an option">
            <i-select-option value="a" label="Option A" />
            <i-select-option value="b" label="Option B" />
            <i-select-option value="c" label="Option C" disabled />
        </i-select>
    </i-form-group>
    <i-form-group size="sm">
        <i-form-label>Checkbox</i-form-label>
        <i-checkbox-group v-model="checkboxSizeSm">
            <i-checkbox value="Football">Football</i-checkbox>
            <i-checkbox value="Volleyball">Volleyball</i-checkbox>
            <i-checkbox value="Tennis" disabled>Tennis</i-checkbox>
        </i-checkbox-group>
    </i-form-group>
    <i-form-group size="sm">
        <i-form-label>Radio</i-form-label>
        <i-radio-group v-model="radioSizeSm">
            <i-radio value="Accept">Accept</i-radio>
            <i-radio value="Decline">Decline</i-radio>
        </i-radio-group>
    </i-form-group>
</i-tab>
<i-tab type="html">

~~~html
<i-form-group size="sm">
    <i-form-label>Input</i-form-label>
    <i-input v-model="input" placeholder="Type something.." />
</i-form-group>

<i-form-group size="sm">
    <i-form-label>Textarea</i-form-label>
    <i-textarea v-model="textarea" placeholder="Write a comment.." />
</i-form-group>

<i-form-group size="sm">
    <i-form-label>Select</i-form-label>
    <i-select v-model="select" placeholder="Choose an option">
        <i-select-option value="a" label="Option A" />
        <i-select-option value="b" label="Option B" />
        <i-select-option value="c" label="Option C" disabled />
    </i-select>
</i-form-group>

<i-form-group size="sm">
    <i-form-label>Checkbox</i-form-label>
    <i-checkbox-group v-model="checkbox">
        <i-checkbox value="Football">Football</i-checkbox>
        <i-checkbox value="Volleyball">Volleyball</i-checkbox>
        <i-checkbox value="Tennis" disabled>Tennis</i-checkbox>
    </i-checkbox-group>
</i-form-group>

<i-form-group size="sm">
    <i-form-label>Radio</i-form-label>
    <i-radio-group v-model="radio">
        <i-radio value="Accept">Accept</i-radio>
        <i-radio value="Decline">Decline</i-radio>
    </i-radio-group>
</i-form-group>
~~~

</i-tab>
<i-tab type="js">

~~~js
export default {
  data () {
    return {
      input: '',
      textarea: '',
      select: '',
      checkbox: ['Football'],
      radio: 'Decline'
    };
  }
}
~~~

</i-tab>
</i-code>

<i-code title="Medium Form Group">
<i-tab type="preview">
    <i-form-group size="md">
        <i-form-label>Input</i-form-label>
        <i-input v-model="inputSizeMd" placeholder="Type something.." />
    </i-form-group>
    <i-form-group size="md">
        <i-form-label>Textarea</i-form-label>
        <i-textarea v-model="textareaSizeMd" placeholder="Write a comment.." />
    </i-form-group>
    <i-form-group size="md">
        <i-form-label>Select</i-form-label>
        <i-select v-model="selectSizeMd" placeholder="Choose an option">
            <i-select-option value="a" label="Option A" />
            <i-select-option value="b" label="Option B" />
            <i-select-option value="c" label="Option C" disabled />
        </i-select>
    </i-form-group>
    <i-form-group size="md">
        <i-form-label>Checkbox</i-form-label>
        <i-checkbox-group v-model="checkboxSizeMd">
            <i-checkbox value="Football">Football</i-checkbox>
            <i-checkbox value="Volleyball">Volleyball</i-checkbox>
            <i-checkbox value="Tennis" disabled>Tennis</i-checkbox>
        </i-checkbox-group>
    </i-form-group>
    <i-form-group size="md">
        <i-form-label>Radio</i-form-label>
        <i-radio-group v-model="radioSizeMd">
            <i-radio value="Accept">Accept</i-radio>
            <i-radio value="Decline">Decline</i-radio>
        </i-radio-group>
    </i-form-group>
</i-tab>
<i-tab type="html">

~~~html
<i-form-group size="md">
    <i-form-label>Input</i-form-label>
    <i-input v-model="input" placeholder="Type something.." />
</i-form-group>

<i-form-group size="md">
    <i-form-label>Textarea</i-form-label>
    <i-textarea v-model="textarea" placeholder="Write a comment.." />
</i-form-group>

<i-form-group size="md">
    <i-form-label>Select</i-form-label>
    <i-select v-model="select" placeholder="Choose an option">
        <i-select-option value="a" label="Option A" />
        <i-select-option value="b" label="Option B" />
        <i-select-option value="c" label="Option C" disabled />
    </i-select>
</i-form-group>

<i-form-group size="md">
    <i-form-label>Checkbox</i-form-label>
    <i-checkbox-group v-model="checkbox">
        <i-checkbox value="Football">Football</i-checkbox>
        <i-checkbox value="Volleyball">Volleyball</i-checkbox>
        <i-checkbox value="Tennis" disabled>Tennis</i-checkbox>
    </i-checkbox-group>
</i-form-group>

<i-form-group size="md">
    <i-form-label>Radio</i-form-label>
    <i-radio-group v-model="radio">
        <i-radio value="Accept">Accept</i-radio>
        <i-radio value="Decline">Decline</i-radio>
    </i-radio-group>
</i-form-group>
~~~

</i-tab>
<i-tab type="js">

~~~js
export default {
  data () {
    return {
      input: '',
      textarea: '',
      select: '',
      checkbox: ['Football'],
      radio: 'Decline'
    };
  }
}
~~~

</i-tab>
</i-code>

<i-code title="Large Form Group">
<i-tab type="preview">
    <i-form-group size="lg">
        <i-form-label>Input</i-form-label>
        <i-input v-model="inputSizeLg" placeholder="Type something.." />
    </i-form-group>
    <i-form-group size="lg">
        <i-form-label>Textarea</i-form-label>
        <i-textarea v-model="textareaSizeLg" placeholder="Write a comment.." />
    </i-form-group>
    <i-form-group size="lg">
        <i-form-label>Select</i-form-label>
        <i-select v-model="selectSizeLg" placeholder="Choose an option">
            <i-select-option value="a" label="Option A" />
            <i-select-option value="b" label="Option B" />
            <i-select-option value="c" label="Option C" disabled />
        </i-select>
    </i-form-group>
    <i-form-group size="lg">
        <i-form-label>Checkbox</i-form-label>
        <i-checkbox-group v-model="checkboxSizeLg">
            <i-checkbox value="Football">Football</i-checkbox>
            <i-checkbox value="Volleyball">Volleyball</i-checkbox>
            <i-checkbox value="Tennis" disabled>Tennis</i-checkbox>
        </i-checkbox-group>
    </i-form-group>
    <i-form-group size="lg">
        <i-form-label>Radio</i-form-label>
        <i-radio-group v-model="radioSizeLg">
            <i-radio value="Accept">Accept</i-radio>
            <i-radio value="Decline">Decline</i-radio>
        </i-radio-group>
    </i-form-group>
</i-tab>
<i-tab type="html">

~~~html
<i-form-group size="lg">
    <i-form-label>Input</i-form-label>
    <i-input v-model="input" placeholder="Type something.." />
</i-form-group>

<i-form-group size="lg">
    <i-form-label>Textarea</i-form-label>
    <i-textarea v-model="textarea" placeholder="Write a comment.." />
</i-form-group>

<i-form-group size="lg">
    <i-form-label>Select</i-form-label>
    <i-select v-model="select" placeholder="Choose an option">
        <i-select-option value="a" label="Option A" />
        <i-select-option value="b" label="Option B" />
        <i-select-option value="c" label="Option C" disabled />
    </i-select>
</i-form-group>

<i-form-group size="lg">
    <i-form-label>Checkbox</i-form-label>
    <i-checkbox-group v-model="checkbox">
        <i-checkbox value="Football">Football</i-checkbox>
        <i-checkbox value="Volleyball">Volleyball</i-checkbox>
        <i-checkbox value="Tennis" disabled>Tennis</i-checkbox>
    </i-checkbox-group>
</i-form-group>

<i-form-group size="lg">
    <i-form-label>Radio</i-form-label>
    <i-radio-group v-model="radio">
        <i-radio value="Accept">Accept</i-radio>
        <i-radio value="Decline">Decline</i-radio>
    </i-radio-group>
</i-form-group>
~~~

</i-tab>
<i-tab type="js">

~~~js
export default {
  data () {
    return {
      input: '',
      textarea: '',
      select: '',
      checkbox: ['Football'],
      radio: 'Decline'
    };
  }
}
~~~

</i-tab>
</i-code>

### Form Group Nesting
You can nest form groups in order to control the `disabled`, `readonly` and `size` properties of multiple inputs at once. All the child inputs of the parent form group will inherit the property. 

<i-code title="Disabled Form Group Nesting">
<i-tab type="preview">
    <i-form-group disabled>
        <i-form-group>
            <i-form-label>Input</i-form-label>
            <i-input v-model="inputNested" placeholder="Type something.." />
        </i-form-group>
        <i-form-group>
            <i-form-label>Input</i-form-label>
            <i-input v-model="passwordNested" type="password" placeholder="Enter your password.." />
        </i-form-group>
    </i-form-group>
</i-tab>
<i-tab type="html">

~~~html
<i-form-group disabled>
    <i-form-group>
        <i-form-label>Input</i-form-label>
        <i-input v-model="input" placeholder="Type something.." />
    </i-form-group>
    <i-form-group>
        <i-form-label>Input</i-form-label>
        <i-input v-model="password" type="password" placeholder="Enter your password.." />
    </i-form-group>
</i-form-group>
~~~

</i-tab>
<i-tab type="js">

~~~js
export default {
  data () {
    return {
      input: '',
      password: '',
      textarea: '',
      select: '',
      checkbox: ['Football'],
      radio: 'Decline'
    };
  }
}
~~~

</i-tab>
</i-code>


<i-code title="Readonly Form Group Nesting">
<i-tab type="preview">
    <i-form-group readonly>
        <i-form-group>
            <i-form-label>Textarea</i-form-label>
            <i-textarea v-model="textareaNested" placeholder="Write a comment.." />
        </i-form-group>
        <i-form-group>
            <i-form-label>Select</i-form-label>
            <i-select v-model="selectNested" placeholder="Choose an option">
                <i-select-option value="a" label="Option A" />
                <i-select-option value="b" label="Option B" />
                <i-select-option value="c" label="Option C" disabled />
            </i-select>
        </i-form-group>
    </i-form-group>
</i-tab>
<i-tab type="html">

~~~html
<i-form-group readonly>
    <i-form-group>
        <i-form-label>Textarea</i-form-label>
        <i-textarea v-model="textarea" placeholder="Write a comment.." />
    </i-form-group>
    <i-form-group>
        <i-form-label>Select</i-form-label>
        <i-select v-model="select" placeholder="Choose an option">
            <i-select-option value="a" label="Option A" />
            <i-select-option value="b" label="Option B" />
            <i-select-option value="c" label="Option C" disabled />
        </i-select>
    </i-form-group>
</i-form-group>
~~~

</i-tab>
<i-tab type="js">

~~~js
export default {
  data () {
    return {
      input: '',
      password: '',
      textarea: '',
      select: '',
      checkbox: ['Football'],
      radio: 'Decline'
    };
  }
}
~~~

</i-tab>
</i-code>


<i-code title="Sized Form Group Nesting">
<i-tab type="preview">
    <i-form-group size="lg">
        <i-form-label>Checkbox</i-form-label>
        <i-checkbox-group v-model="checkboxNested">
            <i-checkbox value="Football">Football</i-checkbox>
            <i-checkbox value="Volleyball">Volleyball</i-checkbox>
            <i-checkbox value="Tennis" disabled>Tennis</i-checkbox>
        </i-checkbox-group>
        <i-form-label>Radio</i-form-label>
        <i-radio-group v-model="radioNested">
            <i-radio value="Accept">Accept</i-radio>
            <i-radio value="Decline">Decline</i-radio>
        </i-radio-group>
    </i-form-group>
</i-tab>
<i-tab type="html">

~~~html
<i-form-group size="lg">
    <i-form-group>
        <i-form-label>Checkbox</i-form-label>
        <i-checkbox-group v-model="checkbox">
            <i-checkbox value="Football">Football</i-checkbox>
            <i-checkbox value="Volleyball">Volleyball</i-checkbox>
            <i-checkbox value="Tennis" disabled>Tennis</i-checkbox>
        </i-checkbox-group>
    </i-form-group>
    <i-form-group>
        <i-form-label>Radio</i-form-label>
        <i-radio-group v-model="radio">
            <i-radio value="Accept">Accept</i-radio>
            <i-radio value="Decline">Decline</i-radio>
        </i-radio-group>
    </i-form-group>
</i-form-group>
~~~

</i-tab>
<i-tab type="js">

~~~js
export default {
  data () {
    return {
      input: '',
      password: '',
      textarea: '',
      select: '',
      checkbox: ['Football'],
      radio: 'Decline'
    };
  }
}
~~~

</i-tab>
</i-code>


### Component API
Here you can find a list of the various customization options you can use for the form group components as props, as well as available slots.

<i-code title="Form Group API" markup="i-form-group" expanded>
    <i-tab type="props">
        <api-table>
            <api-table-row>
                <template slot="property">disabled</template>
                <template slot="description">Sets the state of the form group component as disabled.</template>
                <template slot="type"><code>Boolean</code></template>
                <template slot="values"><code>true</code>, <code>false</code></template>
                <template slot="default"><code>false</code></template>
            </api-table-row>
            <api-table-row>
                <template slot="property">readonly</template>
                <template slot="description">Sets the state of the form group component as readonly.</template>
                <template slot="type"><code>Boolean</code></template>
                <template slot="values"><code>true</code>, <code>false</code></template>
                <template slot="default"><code>false</code></template>
            </api-table-row>
            <api-table-row>
                <template slot="property">size</template>
                <template slot="description">Sets the size of the form group component.</template>
                <template slot="type"><code>String</code></template>
                <template slot="values"><code>sm</code>, <code>md</code>, <code>lg</code></template>
                <template slot="default"><code>md</code></template>
            </api-table-row>
            <api-table-row>
                <template slot="property">inline</template>
                <template slot="description">Sets the form group styling to be inline.</template>
                <template slot="type"><code>Boolean</code></template>
                <template slot="values"><code>true</code>, <code>false</code></template>
                <template slot="default"><code>false</code></template>
            </api-table-row>
            <api-table-row>
                <template slot="property">validate</template>
                <template slot="description">Determine whether to display the error messages related to the immediate child input.</template>
                <template slot="type"><code>Boolean</code></template>
                <template slot="values"><code>true</code>, <code>false</code></template>
                <template slot="default"><code>true</code></template>
            </api-table-row>
        </api-table>
    </i-tab>
    <i-tab type="slots">
        <api-table>
            <api-table-row>
                <template slot="slot">default</template>
                <template slot="description">Slot for form group default content.</template>
            </api-table-row>
        </api-table>
    </i-tab>
</i-code>


### Sass Variables
Here you can find a list of the Sass variables you can use for the form group component. If you're looking to find common variables that these rely on, you should take a look at the <nuxt-link :to="{ name: 'docs-core-sass-variables' }">Sass Variables</nuxt-link> page.

<i-code title="Form Group" expanded>
    <i-tab type="scss">
        <api-table>
            <api-table-row>
                <template slot="property">$form-group-margin</template>
                <template slot="default"><code>$spacer</code></template>
            </api-table-row>
            <api-table-row>
                <template slot="property">$form-group-error-margin</template>
                <template slot="default"><code>($spacer / 4) 0 0</code></template>
            </api-table-row>
        </api-table>
    </i-tab>
</i-code> 
