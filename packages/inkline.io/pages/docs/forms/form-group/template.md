# Form Groups
Form groups are the easiest way to add structure to form elements. { .lead }

### Example

The `<i-form-group>` component is a wrapper that provides proper grouping of labels, input, help text, and form validation messaging. By default, form groups add a `margin-bottom` to provide spacing between form groups.

<i-code-preview title="Basic Form Group" link="https://github.com/inkline/inkline/tree/master/src/components/FormGroup">

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

<template slot="html">

~~~html
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
Setting a form group as `disabled` will cause all of its child inputs to be disabled.


<i-code-preview title="Disabled Form Group" link="https://github.com/inkline/inkline/tree/master/src/components/FormGroup">

<i-form-group disabled>
    <i-input v-model="inputDisabled" placeholder="Type something.." />
</i-form-group>

<i-form-group disabled>
    <i-textarea v-model="textareaDisabled" placeholder="Write a comment.." />
</i-form-group>

<i-form-group disabled>
    <i-select v-model="selectDisabled" placeholder="Choose an option">
        <i-select-option value="a" label="Option A" />
        <i-select-option value="b" label="Option B" />
        <i-select-option value="c" label="Option C" disabled />
    </i-select>
</i-form-group>

<i-form-group disabled>
    <i-checkbox-group v-model="checkboxDisabled">
        <i-checkbox value="Football">Football</i-checkbox>
        <i-checkbox value="Volleyball">Volleyball</i-checkbox>
        <i-checkbox value="Tennis" disabled>Tennis</i-checkbox>
    </i-checkbox-group>
</i-form-group>

<i-form-group disabled>
    <i-radio-group v-model="radioDisabled">
        <i-radio value="Accept">Accept</i-radio>
        <i-radio value="Decline">Decline</i-radio>
    </i-radio-group>
</i-form-group>

<template slot="html">

~~~html
<i-form-group disabled>
    <i-input v-model="input" placeholder="Type something.." />
</i-form-group>

<i-form-group disabled>
    <i-textarea v-model="textarea" placeholder="Write a comment.." />
</i-form-group>

<i-form-group disabled>
    <i-select v-model="select" placeholder="Choose an option">
        <i-select-option value="a" label="Option A" />
        <i-select-option value="b" label="Option B" />
        <i-select-option value="c" label="Option C" disabled />
    </i-select>
</i-form-group>

<i-form-group disabled>
    <i-checkbox-group v-model="checkbox">
        <i-checkbox value="Football">Football</i-checkbox>
        <i-checkbox value="Volleyball">Volleyball</i-checkbox>
        <i-checkbox value="Tennis" disabled>Tennis</i-checkbox>
    </i-checkbox-group>
</i-form-group>

<i-form-group disabled>
    <i-radio-group v-model="radio">
        <i-radio value="Accept">Accept</i-radio>
        <i-radio value="Decline">Decline</i-radio>
    </i-radio-group>
</i-form-group>
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
You're able to use the `size` modifier to control the size of the components inside your `<i-form-group>`, using one of the available sizes: `sm`, `md`, and `lg`. The default size is set to `md`. 

All of the components inside the `<i-form-group>` will inherit the parent form group's size.

<i-code-preview title="Small Form Group" link="https://github.com/inkline/inkline/tree/master/src/components/FormGroup">

<i-form-group size="sm">
    <i-input v-model="inputSizeSm" placeholder="Type something.." />
</i-form-group>

<i-form-group size="sm">
    <i-textarea v-model="textareaSizeSm" placeholder="Write a comment.." />
</i-form-group>

<i-form-group size="sm">
    <i-select v-model="selectSizeSm" placeholder="Choose an option">
        <i-select-option value="a" label="Option A" />
        <i-select-option value="b" label="Option B" />
        <i-select-option value="c" label="Option C" disabled />
    </i-select>
</i-form-group>

<i-form-group size="sm">
    <i-checkbox-group v-model="checkboxSizeSm">
        <i-checkbox value="Football">Football</i-checkbox>
        <i-checkbox value="Volleyball">Volleyball</i-checkbox>
        <i-checkbox value="Tennis" disabled>Tennis</i-checkbox>
    </i-checkbox-group>
</i-form-group>

<i-form-group size="sm">
    <i-radio-group v-model="radioSizeSm">
        <i-radio value="Accept">Accept</i-radio>
        <i-radio value="Decline">Decline</i-radio>
    </i-radio-group>
</i-form-group>

<template slot="html">

~~~html
<i-form-group size="sm">
    <i-input v-model="input" placeholder="Type something.." />
</i-form-group>

<i-form-group size="sm">
    <i-textarea v-model="textarea" placeholder="Write a comment.." />
</i-form-group>

<i-form-group size="sm">
    <i-select v-model="select" placeholder="Choose an option">
        <i-select-option value="a" label="Option A" />
        <i-select-option value="b" label="Option B" />
        <i-select-option value="c" label="Option C" disabled />
    </i-select>
</i-form-group>

<i-form-group size="sm">
    <i-checkbox-group v-model="checkbox">
        <i-checkbox value="Football">Football</i-checkbox>
        <i-checkbox value="Volleyball">Volleyball</i-checkbox>
        <i-checkbox value="Tennis" disabled>Tennis</i-checkbox>
    </i-checkbox-group>
</i-form-group>

<i-form-group size="sm">
    <i-radio-group v-model="radio">
        <i-radio value="Accept">Accept</i-radio>
        <i-radio value="Decline">Decline</i-radio>
    </i-radio-group>
</i-form-group>
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

<i-code-preview title="Medium Form Group" link="https://github.com/inkline/inkline/tree/master/src/components/FormGroup">

<i-form-group size="md">
    <i-input v-model="inputSizeMd" placeholder="Type something.." />
</i-form-group>

<i-form-group size="md">
    <i-textarea v-model="textareaSizeMd" placeholder="Write a comment.." />
</i-form-group>

<i-form-group size="md">
    <i-select v-model="selectSizeMd" placeholder="Choose an option">
        <i-select-option value="a" label="Option A" />
        <i-select-option value="b" label="Option B" />
        <i-select-option value="c" label="Option C" disabled />
    </i-select>
</i-form-group>

<i-form-group size="md">
    <i-checkbox-group v-model="checkboxSizeMd">
        <i-checkbox value="Football">Football</i-checkbox>
        <i-checkbox value="Volleyball">Volleyball</i-checkbox>
        <i-checkbox value="Tennis" disabled>Tennis</i-checkbox>
    </i-checkbox-group>
</i-form-group>

<i-form-group size="md">
    <i-radio-group v-model="radioSizeMd">
        <i-radio value="Accept">Accept</i-radio>
        <i-radio value="Decline">Decline</i-radio>
    </i-radio-group>
</i-form-group>

<template slot="html">

~~~html
<i-form-group size="md">
    <i-input v-model="input" placeholder="Type something.." />
</i-form-group>

<i-form-group size="md">
    <i-textarea v-model="textarea" placeholder="Write a comment.." />
</i-form-group>

<i-form-group size="md">
    <i-select v-model="select" placeholder="Choose an option">
        <i-select-option value="a" label="Option A" />
        <i-select-option value="b" label="Option B" />
        <i-select-option value="c" label="Option C" disabled />
    </i-select>
</i-form-group>

<i-form-group size="md">
    <i-checkbox-group v-model="checkbox">
        <i-checkbox value="Football">Football</i-checkbox>
        <i-checkbox value="Volleyball">Volleyball</i-checkbox>
        <i-checkbox value="Tennis" disabled>Tennis</i-checkbox>
    </i-checkbox-group>
</i-form-group>

<i-form-group size="md">
    <i-radio-group v-model="radio">
        <i-radio value="Accept">Accept</i-radio>
        <i-radio value="Decline">Decline</i-radio>
    </i-radio-group>
</i-form-group>
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

<i-code-preview title="Large Form Group" link="https://github.com/inkline/inkline/tree/master/src/components/FormGroup">

<i-form-group size="lg">
    <i-input v-model="inputSizeLg" placeholder="Type something.." />
</i-form-group>

<i-form-group size="lg">
    <i-textarea v-model="textareaSizeLg" placeholder="Write a comment.." />
</i-form-group>

<i-form-group size="lg">
    <i-select v-model="selectSizeLg" placeholder="Choose an option">
        <i-select-option value="a" label="Option A" />
        <i-select-option value="b" label="Option B" />
        <i-select-option value="c" label="Option C" disabled />
    </i-select>
</i-form-group>

<i-form-group size="lg">
    <i-checkbox-group v-model="checkboxSizeLg">
        <i-checkbox value="Football">Football</i-checkbox>
        <i-checkbox value="Volleyball">Volleyball</i-checkbox>
        <i-checkbox value="Tennis" disabled>Tennis</i-checkbox>
    </i-checkbox-group>
</i-form-group>

<i-form-group size="lg">
    <i-radio-group v-model="radioSizeLg">
        <i-radio value="Accept">Accept</i-radio>
        <i-radio value="Decline">Decline</i-radio>
    </i-radio-group>
</i-form-group>

<template slot="html">

~~~html
<i-form-group size="lg">
    <i-input v-model="input" placeholder="Type something.." />
</i-form-group>

<i-form-group size="lg">
    <i-textarea v-model="textarea" placeholder="Write a comment.." />
</i-form-group>

<i-form-group size="lg">
    <i-select v-model="select" placeholder="Choose an option">
        <i-select-option value="a" label="Option A" />
        <i-select-option value="b" label="Option B" />
        <i-select-option value="c" label="Option C" disabled />
    </i-select>
</i-form-group>

<i-form-group size="lg">
    <i-checkbox-group v-model="checkbox">
        <i-checkbox value="Football">Football</i-checkbox>
        <i-checkbox value="Volleyball">Volleyball</i-checkbox>
        <i-checkbox value="Tennis" disabled>Tennis</i-checkbox>
    </i-checkbox-group>
</i-form-group>

<i-form-group size="lg">
    <i-radio-group v-model="radio">
        <i-radio value="Accept">Accept</i-radio>
        <i-radio value="Decline">Decline</i-radio>
    </i-radio-group>
</i-form-group>
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

### Form Group Nesting
You can nest form groups in order to control the `disabled`, `readonly` and `size` properties of multiple inputs at once. All the child inputs of the parent form group will inherit the property. 

<i-code-preview title="Disabled Form Group Nesting" link="https://github.com/inkline/inkline/tree/master/src/components/FormGroup">

<i-form-group disabled>
    <i-form-group>
        <i-input v-model="inputNested" placeholder="Type something.." />
    </i-form-group>
    <i-form-group>
        <i-input v-model="passwordNested" type="password" placeholder="Enter your password.." />
    </i-form-group>
</i-form-group>

<template slot="html">

~~~html
<i-form-group disabled>
    <i-form-group>
        <i-input v-model="input" placeholder="Type something.." />
    </i-form-group>
    <i-form-group>
        <i-input v-model="password" type="password" placeholder="Enter your password.." />
    </i-form-group>
</i-form-group>
~~~

</template>
<template slot="js">

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

</template>
</i-code-preview>


<i-code-preview title="Readonly Form Group Nesting" link="https://github.com/inkline/inkline/tree/master/src/components/FormGroup">

<i-form-group readonly>
    <i-form-group>
        <i-textarea v-model="textareaNested" placeholder="Write a comment.." />
    </i-form-group>
    <i-form-group>
        <i-select v-model="selectNested" placeholder="Choose an option">
            <i-select-option value="a" label="Option A" />
            <i-select-option value="b" label="Option B" />
            <i-select-option value="c" label="Option C" disabled />
        </i-select>
    </i-form-group>
</i-form-group>

<template slot="html">

~~~html
<i-form-group readonly>
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
</i-form-group>
~~~

</template>
<template slot="js">

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

</template>
</i-code-preview>


<i-code-preview title="Sized Form Group Nesting" link="https://github.com/inkline/inkline/tree/master/src/components/FormGroup">

<i-form-group size="lg">
    <i-checkbox-group v-model="checkboxNested">
        <i-checkbox value="Football">Football</i-checkbox>
        <i-checkbox value="Volleyball">Volleyball</i-checkbox>
        <i-checkbox value="Tennis" disabled>Tennis</i-checkbox>
    </i-checkbox-group>
    <i-radio-group v-model="radioNested">
        <i-radio value="Accept">Accept</i-radio>
        <i-radio value="Decline">Decline</i-radio>
    </i-radio-group>
</i-form-group>

<template slot="html">

~~~html
<i-form-group size="lg">
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
</i-form-group>
~~~

</template>
<template slot="js">

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

</template>
</i-code-preview>


### API

<i-api-preview title="Form Group API" markup="i-form-group" expanded>
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
                    <td>Sets the state of the form group component as disabled.</td>
                    <td><code>Boolean</code></td>
                    <td><code>true</code>, <code>false</code></td>
                    <td><code>false</code></td>
                </tr>
                <tr>
                    <td>readonly</td>
                    <td>Sets the state of the form group component as readonly.</td>
                    <td><code>Boolean</code></td>
                    <td><code>true</code>, <code>false</code></td>
                    <td><code>false</code></td>
                </tr>
                <tr>
                    <td>size</td>
                    <td>Sets the size of the form group component.</td>
                    <td><code>String</code></td>
                    <td><code>sm</code>, <code>md</code>, <code>lg</code></td>
                    <td><code>md</code></td>
                </tr>
                <tr>
                    <td>inline</td>
                    <td>Sets the form group styling to be inline.</td>
                    <td><code>Boolean</code></td>
                    <td><code>true</code>, <code>false</code></td>
                    <td><code>false</code></td>
                </tr>
                <tr>
                    <td>validate</td>
                    <td>Determine whether to display the error messages related to the immediate child input.</td>
                    <td><code>Boolean</code></td>
                    <td><code>true</code>, <code>false</code></td>
                    <td><code>true</code></td>
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
                    <td>Slot for form group default content.</td>
                </tr>
            </tbody>
        </table>
    </template>
</i-api-preview>
