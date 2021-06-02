---
title: Form Validation
description: Forms are the main wrapper components for form elements, with powerful customization and validation options. 
---

<script setup>
import * as examples from './examples';
</script>



# Form
## Forms are the main wrapper components for form elements, with powerful customization and validation options. 

### Basic Example

The `<i-form>` component is a wrapper that provides proper handling of form validation and form grouping. As you would expect, you can use the `@submit` handler for the submit event.

<example :component="examples.IFormValidationBasicExample" :html="examples.IFormValidationBasicExampleHTML" :js="examples.IFormValidationBasicExampleJS"></example>

<!--
### Disabled State
Setting a form as `disabled` will cause all of its child inputs to be disabled.


<i-code title="Disabled Form">
<i-tab type="preview">
    <i-form disabled>
        <i-form-group>
            <i-form-label>Disabled Input</i-form-label>
            <i-input v-model="inputDisabled" placeholder="Type something.." />
        </i-form-group>
        <i-form-group>
            <i-form-label>Disabled Textarea</i-form-label>
            <i-textarea v-model="textareaDisabled" placeholder="Write a comment.." />
        </i-form-group>
        <i-form-group>
            <i-form-label>Disabled Select</i-form-label>
            <i-select v-model="selectDisabled" placeholder="Choose an option">
                <i-select-option value="a" label="Option A" />
                <i-select-option value="b" label="Option B" />
                <i-select-option value="c" label="Option C" disabled/>
            </i-select>
        </i-form-group>
        <i-form-group>
            <i-form-label>Disabled Checkbox</i-form-label>
            <i-checkbox-group v-model="checkboxDisabled">
                <i-checkbox value="Football">Football</i-checkbox>
                <i-checkbox value="Volleyball">Volleyball</i-checkbox>
                <i-checkbox value="Tennis" disabled>Tennis</i-checkbox>
            </i-checkbox-group>
        </i-form-group>
        <i-form-group>
            <i-form-label>Disabled Radio</i-form-label>
            <i-radio-group v-model="radioDisabled">
                <i-radio value="Accept">Accept</i-radio>
                <i-radio value="Decline">Decline</i-radio>
            </i-radio-group>
        </i-form-group>
        <i-form-group>
            <i-button type="submit">Submit</i-button>
        </i-form-group>
    </i-form>
</i-tab>
<i-tab type="html">

~~~html
<i-form disabled>
    <i-form-group>
        <i-form-label>Disabled Input</i-form-label>
        <i-input v-model="input" placeholder="Type something.." />
    </i-form-group>
    
    <i-form-group>
        <i-form-label>Disabled Textarea</i-form-label>
        <i-textarea v-model="textarea" placeholder="Write a comment.." />
    </i-form-group>
    
    <i-form-group>
        <i-form-label>Disabled Select</i-form-label>
        <i-select v-model="select" placeholder="Choose an option">
            <i-select-option value="a" label="Option A" />
            <i-select-option value="b" label="Option B" />
            <i-select-option value="c" label="Option C" disabled />
        </i-select>
    </i-form-group>
    
    <i-form-group>
        <i-form-label>Disabled Checkbox</i-form-label>
        <i-checkbox-group v-model="checkbox">
            <i-checkbox value="Football">Football</i-checkbox>
            <i-checkbox value="Volleyball">Volleyball</i-checkbox>
            <i-checkbox value="Tennis">Tennis</i-checkbox>
        </i-checkbox-group>
    </i-form-group>
    
    <i-form-group>
        <i-form-label>Disabled Radio</i-form-label>
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
You're able to use the `size` modifier to control the size of the components inside your `<i-form>`, using one of the available sizes: `sm`, `md`, and `lg`. The default size is set to `md`. 

All of the components inside the `<i-form>` will inherit the parent form group's size.


<i-code title="Small Form Size">
<i-tab type="preview">
    <i-form size="sm">
        <i-form-group>
            <i-form-label>Input</i-form-label>
            <i-input v-model="inputSizeSm" placeholder="Type something.." />
        </i-form-group>
        <i-form-group>
            <i-form-label>Textarea</i-form-label>
            <i-textarea v-model="textareaSizeSm" placeholder="Write a comment.." />
        </i-form-group>
        <i-form-group>
            <i-form-label>Select</i-form-label>
            <i-select v-model="selectSizeSm" placeholder="Choose an option">
                <i-select-option value="a" label="Option A" />
                <i-select-option value="b" label="Option B" />
                <i-select-option value="c" label="Option C" disabled />
            </i-select>
        </i-form-group>
        <i-form-group>
            <i-form-label>Checkbox</i-form-label>
            <i-checkbox-group v-model="checkboxSizeSm">
                <i-checkbox value="Football">Football</i-checkbox>
                <i-checkbox value="Volleyball">Volleyball</i-checkbox>
                <i-checkbox value="Tennis" disabled>Tennis</i-checkbox>
            </i-checkbox-group>
        </i-form-group>
        <i-form-group>
            <i-form-label>Radio</i-form-label>
            <i-radio-group v-model="radioSizeSm">
                <i-radio value="Accept">Accept</i-radio>
                <i-radio value="Decline">Decline</i-radio>
            </i-radio-group>
        </i-form-group>
        <i-form-group>
            <i-button type="submit">Submit</i-button>
        </i-form-group>
    </i-form>
</i-tab>
<i-tab type="html">

~~~html
<i-form size="sm">
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
    
    <i-form-group>
        <i-button type="submit">Submit</i-button>
    </i-form-group>
</i-form>
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


<i-code title="Medium Form Size">
<i-tab type="preview">
    <i-form size="md">
        <i-form-group>
            <i-form-label>Input</i-form-label>
            <i-input v-model="inputSizeMd" placeholder="Type something.." />
        </i-form-group>
        <i-form-group>
            <i-form-label>Textarea</i-form-label>
            <i-textarea v-model="textareaSizeMd" placeholder="Write a comment.." />
        </i-form-group>
        <i-form-group>
            <i-form-label>Select</i-form-label>
            <i-select v-model="selectSizeMd" placeholder="Choose an option">
                <i-select-option value="a" label="Option A" />
                <i-select-option value="b" label="Option B" />
                <i-select-option value="c" label="Option C" disabled />
            </i-select>
        </i-form-group>
        <i-form-group>
            <i-form-label>Checkbox</i-form-label>
            <i-checkbox-group v-model="checkboxSizeMd">
                <i-checkbox value="Football">Football</i-checkbox>
                <i-checkbox value="Volleyball">Volleyball</i-checkbox>
                <i-checkbox value="Tennis" disabled>Tennis</i-checkbox>
            </i-checkbox-group>
        </i-form-group>
        <i-form-group>
            <i-form-label>Radio</i-form-label>
            <i-radio-group v-model="radioSizeMd">
                <i-radio value="Accept">Accept</i-radio>
                <i-radio value="Decline">Decline</i-radio>
            </i-radio-group>
        </i-form-group>
        <i-form-group>
            <i-button type="submit">Submit</i-button>
        </i-form-group>
    </i-form>
</i-tab>
<i-tab type="html">

~~~html
<i-form size="md">
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
    
    <i-form-group>
        <i-button type="submit">Submit</i-button>
    </i-form-group>
</i-form>
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

<i-code title="Large Form Size">
<i-tab type="preview">
    <i-form size="lg">
        <i-form-group>
            <i-form-label>Input</i-form-label>
            <i-input v-model="inputSizeLg" placeholder="Type something.." />
        </i-form-group>
        <i-form-group>
            <i-form-label>Textarea</i-form-label>
            <i-textarea v-model="textareaSizeLg" placeholder="Write a comment.." />
        </i-form-group>
        <i-form-group>
            <i-form-label>Select</i-form-label>
            <i-select v-model="selectSizeLg" placeholder="Choose an option">
                <i-select-option value="a" label="Option A" />
                <i-select-option value="b" label="Option B" />
                <i-select-option value="c" label="Option C" disabled />
            </i-select>
        </i-form-group>
        <i-form-group>
            <i-form-label>Checkbox</i-form-label>
            <i-checkbox-group v-model="checkboxSizeLg">
                <i-checkbox value="Football">Football</i-checkbox>
                <i-checkbox value="Volleyball">Volleyball</i-checkbox>
                <i-checkbox value="Tennis" disabled>Tennis</i-checkbox>
            </i-checkbox-group>
        </i-form-group>
        <i-form-group>
            <i-form-label>Radio</i-form-label>
            <i-radio-group v-model="radioSizeLg">
                <i-radio value="Accept">Accept</i-radio>
                <i-radio value="Decline">Decline</i-radio>
            </i-radio-group>
        </i-form-group>
        <i-form-group>
            <i-button type="submit">Submit</i-button>
        </i-form-group>
    </i-form>
</i-tab>
<i-tab type="html">

~~~html
<i-form size="lg">
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
    
    <i-form-group>
        <i-button type="submit">Submit</i-button>
    </i-form-group>
</i-form>
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

-->
