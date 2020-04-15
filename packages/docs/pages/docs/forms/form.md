# Form
## Forms are the main wrapper components for form elements, with powerful customization and validation options. { .lead }

### Basic Form

The `<i-form>` component is a wrapper that provides proper handling of form validation and form grouping.


<i-code-preview title="Form">

<i-form>
    <i-form-group>
        <i-input v-model="input" name="input" placeholder="Type something.." />
    </i-form-group>
    <i-form-group>
        <i-textarea v-model="textarea" name="textarea" placeholder="Write a comment.." />
    </i-form-group>
    <i-form-group>
        <i-select v-model="select" name="select" placeholder="Choose an option">
            <i-select-option value="a" label="Option A" />
            <i-select-option value="b" label="Option B" />
            <i-select-option value="c" label="Option C" disabled />
        </i-select>
    </i-form-group>
    <i-form-group>
        <i-checkbox-group v-model="checkbox" name="checkbox">
            <i-checkbox value="Football">Football</i-checkbox>
            <i-checkbox value="Volleyball">Volleyball</i-checkbox>
            <i-checkbox value="Tennis" disabled>Tennis</i-checkbox>
        </i-checkbox-group>
    </i-form-group>
    <i-form-group>
        <i-radio-group v-model="radio" name="radio">
            <i-radio value="Accept">Accept</i-radio>
            <i-radio value="Decline">Decline</i-radio>
        </i-radio-group>
    </i-form-group>
    <i-form-group>
        <i-button type="submit">Submit</i-button>
    </i-form-group>
</i-form>

<template slot="html">

~~~html
<i-form>
    <i-form-group>
        <i-input v-model="input" placeholder="Type something.." />
    </i-form-group>
    
    <i-form-group>
        <i-textarea v-model="textarea" placeholder="Write a comment.." />
    </i-form-group>
    
    <i-form-group>
        <i-select v-model="select" placeholder="Choose an option">
            <i-select-option value="a" label="Option A" />
            <i-select-option value="b" label="Option B" />
            <i-select-option value="c" label="Option C" disabled />
        </i-select>
    </i-form-group>
    
    <i-form-group>
        <i-checkbox-group v-model="checkbox">
            <i-checkbox value="Football">Football</i-checkbox>
            <i-checkbox value="Volleyball">Volleyball</i-checkbox>
            <i-checkbox value="Tennis" disabled>Tennis</i-checkbox>
        </i-checkbox-group>
    </i-form-group>
    
    <i-form-group>
        <i-radio-group v-model="radio">
            <i-radio value="Accept">Accept</i-radio>
            <i-radio value="Decline">Decline</i-radio>
        </i-radio-group>
    </i-form-group>
    
    <i-form-group>
        <i-button type="submit">Submit</i-button>
    </i-form-group>
</i-form>
~~~

</template>
<template slot="js">

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

</template>
</i-code-preview>

### Disabled State
Setting a form as `disabled` will cause all of its child inputs to be disabled.


<i-code-preview title="Disabled Form">

<i-form disabled>
    <i-form-group>
        <i-input v-model="inputDisabled" placeholder="Type something.." />
    </i-form-group>
    <i-form-group>
        <i-textarea v-model="textareaDisabled" placeholder="Write a comment.." />
    </i-form-group>
    <i-form-group>
        <i-select v-model="selectDisabled" placeholder="Choose an option">
            <i-select-option value="a" label="Option A" />
            <i-select-option value="b" label="Option B" />
            <i-select-option value="c" label="Option C" disabled/>
        </i-select>
    </i-form-group>
    <i-form-group>
        <i-checkbox-group v-model="checkboxDisabled">
            <i-checkbox value="Football">Football</i-checkbox>
            <i-checkbox value="Volleyball">Volleyball</i-checkbox>
            <i-checkbox value="Tennis" disabled>Tennis</i-checkbox>
        </i-checkbox-group>
    </i-form-group>
    <i-form-group>
        <i-radio-group v-model="radioDisabled">
            <i-radio value="Accept">Accept</i-radio>
            <i-radio value="Decline">Decline</i-radio>
        </i-radio-group>
    </i-form-group>
    <i-form-group>
        <i-button type="submit">Submit</i-button>
    </i-form-group>
</i-form>

<template slot="html">

~~~html
<i-form disabled>
    <i-form-group>
        <i-input v-model="input" placeholder="Type something.." />
    </i-form-group>
    
    <i-form-group>
        <i-textarea v-model="textarea" placeholder="Write a comment.." />
    </i-form-group>
    
    <i-form-group>
        <i-select v-model="select" placeholder="Choose an option">
            <i-select-option value="a" label="Option A" />
            <i-select-option value="b" label="Option B" />
            <i-select-option value="c" label="Option C" disabled />
        </i-select>
    </i-form-group>
    
    <i-form-group>
        <i-checkbox-group v-model="checkbox">
            <i-checkbox value="Football">Football</i-checkbox>
            <i-checkbox value="Volleyball">Volleyball</i-checkbox>
            <i-checkbox value="Tennis">Tennis</i-checkbox>
        </i-checkbox-group>
    </i-form-group>
    
    <i-form-group>
        <i-radio-group v-model="radio">
            <i-radio value="Accept">Accept</i-radio>
            <i-radio value="Decline">Decline</i-radio>
        </i-radio-group>
    </i-form-group>
    
    <i-form-group>
        <i-button type="submit">Submit</i-button>
    </i-form-group>
</i-form>
~~~

</template>
<template slot="js">

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

</template>
</i-code-preview>

### Sizes
You're able to use the `size` modifier to control the size of the components inside your `<i-form>`, using one of the available sizes: `sm`, `md`, and `lg`. The default size is set to `md`. 

All of the components inside the `<i-form>` will inherit the parent form group's size.


<i-code-preview title="Small Form Size">

<i-form size="sm">
    <i-form-group>
        <i-input v-model="inputSizeSm" placeholder="Type something.." />
    </i-form-group>
    <i-form-group>
        <i-textarea v-model="textareaSizeSm" placeholder="Write a comment.." />
    </i-form-group>
    <i-form-group>
        <i-select v-model="selectSizeSm" placeholder="Choose an option">
            <i-select-option value="a" label="Option A" />
            <i-select-option value="b" label="Option B" />
            <i-select-option value="c" label="Option C" disabled />
        </i-select>
    </i-form-group>
    <i-form-group>
        <i-checkbox-group v-model="checkboxSizeSm">
            <i-checkbox value="Football">Football</i-checkbox>
            <i-checkbox value="Volleyball">Volleyball</i-checkbox>
            <i-checkbox value="Tennis" disabled>Tennis</i-checkbox>
        </i-checkbox-group>
    </i-form-group>
    <i-form-group>
        <i-radio-group v-model="radioSizeSm">
            <i-radio value="Accept">Accept</i-radio>
            <i-radio value="Decline">Decline</i-radio>
        </i-radio-group>
    </i-form-group>
    <i-form-group>
        <i-button type="submit">Submit</i-button>
    </i-form-group>
</i-form>

<template slot="html">

~~~html
<i-form size="sm">
    <i-form-group>
        <i-input v-model="input" placeholder="Type something.." />
    </i-form-group>
    
    <i-form-group>
        <i-textarea v-model="textarea" placeholder="Write a comment.." />
    </i-form-group>
    
    <i-form-group>
        <i-select v-model="select" placeholder="Choose an option">
            <i-select-option value="a" label="Option A" />
            <i-select-option value="b" label="Option B" />
            <i-select-option value="c" label="Option C" disabled />
        </i-select>
    </i-form-group>
    
    <i-form-group>
        <i-checkbox-group v-model="checkbox">
            <i-checkbox value="Football">Football</i-checkbox>
            <i-checkbox value="Volleyball">Volleyball</i-checkbox>
            <i-checkbox value="Tennis" disabled>Tennis</i-checkbox>
        </i-checkbox-group>
    </i-form-group>
    
    <i-form-group>
        <i-radio-group v-model="radio">
            <i-radio value="Accept">Accept</i-radio>
            <i-radio value="Decline">Decline</i-radio>
        </i-radio-group>
    </i-form-group>
    
    <i-form-group>
        <i-button type="submit">Submit</i-button>
    </i-form-group>
</i-form>
~~~

</template>
<template slot="js">

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

</template>
</i-code-preview>


<i-code-preview title="Medium Form Size">

<i-form size="md">
    <i-form-group>
        <i-input v-model="inputSizeMd" placeholder="Type something.." />
    </i-form-group>
    <i-form-group>
        <i-textarea v-model="textareaSizeMd" placeholder="Write a comment.." />
    </i-form-group>
    <i-form-group>
        <i-select v-model="selectSizeMd" placeholder="Choose an option">
            <i-select-option value="a" label="Option A" />
            <i-select-option value="b" label="Option B" />
            <i-select-option value="c" label="Option C" disabled />
        </i-select>
    </i-form-group>
    <i-form-group>
        <i-checkbox-group v-model="checkboxSizeMd">
            <i-checkbox value="Football">Football</i-checkbox>
            <i-checkbox value="Volleyball">Volleyball</i-checkbox>
            <i-checkbox value="Tennis" disabled>Tennis</i-checkbox>
        </i-checkbox-group>
    </i-form-group>
    <i-form-group>
        <i-radio-group v-model="radioSizeMd">
            <i-radio value="Accept">Accept</i-radio>
            <i-radio value="Decline">Decline</i-radio>
        </i-radio-group>
    </i-form-group>
    <i-form-group>
        <i-button type="submit">Submit</i-button>
    </i-form-group>
</i-form>

<template slot="html">

~~~html
<i-form size="md">
    <i-form-group>
        <i-input v-model="input" placeholder="Type something.." />
    </i-form-group>
    
    <i-form-group>
        <i-textarea v-model="textarea" placeholder="Write a comment.." />
    </i-form-group>
    
    <i-form-group>
        <i-select v-model="select" placeholder="Choose an option">
            <i-select-option value="a" label="Option A" />
            <i-select-option value="b" label="Option B" />
            <i-select-option value="c" label="Option C" disabled />
        </i-select>
    </i-form-group>
    
    <i-form-group>
        <i-checkbox-group v-model="checkbox">
            <i-checkbox value="Football">Football</i-checkbox>
            <i-checkbox value="Volleyball">Volleyball</i-checkbox>
            <i-checkbox value="Tennis" disabled>Tennis</i-checkbox>
        </i-checkbox-group>
    </i-form-group>
    
    <i-form-group>
        <i-radio-group v-model="radio">
            <i-radio value="Accept">Accept</i-radio>
            <i-radio value="Decline">Decline</i-radio>
        </i-radio-group>
    </i-form-group>
    
    <i-form-group>
        <i-button type="submit">Submit</i-button>
    </i-form-group>
</i-form>
~~~

</template>
<template slot="js">

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

</template>
</i-code-preview>


<i-code-preview title="Large Form Size">

<i-form size="lg">
    <i-form-group>
        <i-input v-model="inputSizeLg" placeholder="Type something.." />
    </i-form-group>
    <i-form-group>
        <i-textarea v-model="textareaSizeLg" placeholder="Write a comment.." />
    </i-form-group>
    <i-form-group>
        <i-select v-model="selectSizeLg" placeholder="Choose an option">
            <i-select-option value="a" label="Option A" />
            <i-select-option value="b" label="Option B" />
            <i-select-option value="c" label="Option C" disabled />
        </i-select>
    </i-form-group>
    <i-form-group>
        <i-checkbox-group v-model="checkboxSizeLg">
            <i-checkbox value="Football">Football</i-checkbox>
            <i-checkbox value="Volleyball">Volleyball</i-checkbox>
            <i-checkbox value="Tennis" disabled>Tennis</i-checkbox>
        </i-checkbox-group>
    </i-form-group>
    <i-form-group>
        <i-radio-group v-model="radioSizeLg">
            <i-radio value="Accept">Accept</i-radio>
            <i-radio value="Decline">Decline</i-radio>
        </i-radio-group>
    </i-form-group>
    <i-form-group>
        <i-button type="submit">Submit</i-button>
    </i-form-group>
</i-form>

<template slot="html">

~~~html
<i-form size="lg">
    <i-form-group>
        <i-input v-model="input" placeholder="Type something.." />
    </i-form-group>
    
    <i-form-group>
        <i-textarea v-model="textarea" placeholder="Write a comment.." />
    </i-form-group>
    
    <i-form-group>
        <i-select v-model="select" placeholder="Choose an option">
            <i-select-option value="a" label="Option A" />
            <i-select-option value="b" label="Option B" />
            <i-select-option value="c" label="Option C" disabled />
        </i-select>
    </i-form-group>
    
    <i-form-group>
        <i-checkbox-group v-model="checkbox">
            <i-checkbox value="Football">Football</i-checkbox>
            <i-checkbox value="Volleyball">Volleyball</i-checkbox>
            <i-checkbox value="Tennis" disabled>Tennis</i-checkbox>
        </i-checkbox-group>
    </i-form-group>
    
    <i-form-group>
        <i-radio-group v-model="radio">
            <i-radio value="Accept">Accept</i-radio>
            <i-radio value="Decline">Decline</i-radio>
        </i-radio-group>
    </i-form-group>
    
    <i-form-group>
        <i-button type="submit">Submit</i-button>
    </i-form-group>
</i-form>
~~~

</template>
<template slot="js">

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

</template>
</i-code-preview>


### Component API
Here you can find a list of the various customization options you can use for the form components as props, as well as available slots and events.

<i-api-preview title="Form API" markup="i-form" expanded>
    <template slot="props">
        <api-table>
            <api-table-row>
                <template slot="property">disabled</template>
                <template slot="description">Sets the state of the form component as disabled.</template>
                <template slot="type"><code>Boolean</code></template>
                <template slot="values"><code>true</code>, <code>false</code></template>
                <template slot="default"><code>false</code></template>
            </api-table-row>
            <api-table-row>
                <template slot="property">readonly</template>
                <template slot="description">Sets the state of the form component as readonly.</template>
                <template slot="type"><code>Boolean</code></template>
                <template slot="values"><code>true</code>, <code>false</code></template>
                <template slot="default"><code>false</code></template>
            </api-table-row>
            <api-table-row>
                <template slot="property">schema</template>
                <template slot="description">Provides a schema binding to the form component. See the <nuxt-link to="/docs/forms/validation/schema">Form Validation</nuxt-link> documentation.</template>
                <template slot="type"><code>Object</code></template>
                <template slot="values"></template>
                <template slot="default"></template>
            </api-table-row>
            <api-table-row>
                <template slot="property">size</template>
                <template slot="description">Sets the size of the form component.</template>
                <template slot="type"><code>String</code></template>
                <template slot="values"><code>sm</code>, <code>md</code>, <code>lg</code></template>
                <template slot="default"><code>md</code></template>
            </api-table-row>
            <api-table-row>
                <template slot="property">inline</template>
                <template slot="description">Sets the form styling to be inline.</template>
                <template slot="type"><code>Boolean</code></template>
                <template slot="values"><code>true</code>, <code>false</code></template>
                <template slot="default"><code>false</code></template>
            </api-table-row>
        </api-table>
    </template>
    <template slot="slots">
        <api-table>
            <api-table-row>
                <template slot="slot">default</template>
                <template slot="description">Slot for form default content.</template>
            </api-table-row>
        </api-table>
    </template>
    <template slot="events">
        <api-table>
            <api-table-row>
                <template slot="event">submit</template>
                <template slot="description">Emitted when form is submitted.</template>
                <template slot="type"><code>(event: Event) => {}</code></template>
            </api-table-row>
            <api-table-row>
                <template slot="event">validate</template>
                <template slot="description">Emitted when form is validated.</template>
                <template slot="type"><code>(event: Event) => {}</code></template>
            </api-table-row>
        </api-table>
    </template>
</i-api-preview>
