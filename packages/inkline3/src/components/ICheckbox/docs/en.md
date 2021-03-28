---
title: Checkbox
description: Checkbox inputs allow the user to select multiple options from a set. 
---

<script setup>
import * as examples from '../examples';
</script>

# Checkbox
## Checkbox inputs allow the user to select multiple options from a set. 

### Basic Usage

Using the `i-checkbox` component to determine a boolean value is very straightforward:

<example :component="examples.ICheckboxBasicExample" :html="examples.ICheckboxBasicExampleHTML" :js="examples.ICheckboxBasicExampleJS"></example>

### Checkbox Group

Using the `i-checkbox` component together with a `i-checkbox-group` allows you to control multiple values using a single binding.

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
