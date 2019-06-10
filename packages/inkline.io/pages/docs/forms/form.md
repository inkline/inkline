# Form
Forms are the main wrapper components for form elements, with powerful customization and validation options. { .lead }

### Basic Form

The `<i-form>` component is a wrapper that provides proper handling of form validation and form grouping.


<i-code-preview title="Form" link="https://github.com/inkline/inkline/tree/master/src/components/Form" class="_padding-bottom-0">

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


<i-code-preview title="Disabled Form" link="https://github.com/inkline/inkline/tree/master/src/components/Form" class="_padding-bottom-0">

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


<i-code-preview title="Small Form Size" link="https://github.com/inkline/inkline/tree/master/src/components/Form" class="_padding-bottom-0">

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


<i-code-preview title="Medium Form Size" link="https://github.com/inkline/inkline/tree/master/src/components/Form" class="_padding-bottom-0">

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


<i-code-preview title="Large Form Size" link="https://github.com/inkline/inkline/tree/master/src/components/Form" class="_padding-bottom-0">

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


### API

<i-api-preview title="Form API" markup="i-form" expanded>
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
                    <td>Sets the state of the form component as disabled.</td>
                    <td><code>Boolean</code></td>
                    <td><code>true</code>, <code>false</code></td>
                    <td><code>false</code></td>
                </tr>
                <tr>
                    <td>readonly</td>
                    <td>Sets the state of the form component as readonly.</td>
                    <td><code>Boolean</code></td>
                    <td><code>true</code>, <code>false</code></td>
                    <td><code>false</code></td>
                </tr>
                <tr>
                    <td>schema</td>
                    <td>Provides a schema binding to the form component. See the <nuxt-link to="/docs/forms/form-validation">Form Validation</nuxt-link> documentation.</td>
                    <td><code>Object</code></td>
                    <td></td>
                    <td></td>
                </tr>
                <tr>
                    <td>size</td>
                    <td>Sets the size of the form component.</td>
                    <td><code>String</code></td>
                    <td><code>sm</code>, <code>md</code>, <code>lg</code></td>
                    <td><code>md</code></td>
                </tr>
                <tr>
                    <td>inline</td>
                    <td>Sets the form styling to be inline.</td>
                    <td><code>Boolean</code></td>
                    <td><code>true</code>, <code>false</code></td>
                    <td><code>false</code></td>
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
                    <td>Slot for form default content.</td>
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
                    <td>submit</td>
                    <td>Emitted when form is submitted.</td>
                    <td><code>(event: Event) => {}</code></td>
                </tr>
                <tr>
                    <td>validate</td>
                    <td>Emitted when form is validated.</td>
                    <td><code>(event: Event) => {}</code></td>
                </tr>
            </tbody>
        </table>
    </template>
</i-api-preview>
