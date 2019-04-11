# Form Validators
Validators are configurable functions used to check whether an input value matches a specific criteria.{.lead}

There are several validation options that can be used in the `validators` field:

<i-code-preview title="Alpha Validator" markup="alpha" link="https://github.com/inkline/inkline/blob/master/src/validators">
<i-form :schema="alphaValidatorForm">
    <i-form-group>
        <i-input :schema="alphaValidatorForm.input" v-model="alphaValidatorForm.input.value" placeholder="This field should contain only letters" />
    </i-form-group>
    <i-form-group>
        <i-input :schema="alphaValidatorForm.inputSpaces" v-model="alphaValidatorForm.inputSpaces.value" placeholder="This field should contain only letters and spaces" />
    </i-form-group>
    <i-form-group>
        <i-input :schema="alphaValidatorForm.inputDashes" v-model="alphaValidatorForm.inputDashes.value" placeholder="This field should contain only letters and dashes" />
    </i-form-group>
</i-form>
<template slot="html">

~~~html
<i-form :schema="form">
    <i-form-group>
        <i-input :schema="form.input" v-model="form.input.value" placeholder="This field should contain only letters" />
    </i-form-group>
    <i-form-group>
        <i-input :schema="form.inputSpaces" v-model="form.inputSpaces.value" placeholder="This field should contain only letters and spaces" />
    </i-form-group>
    <i-form-group>
        <i-input :schema="form.inputDashes" v-model="form.inputDashes.value" placeholder="This field should contain only letters and dashes" />
    </i-form-group>
</i-form>
~~~

</template>
<template slot="js">

~~~js
export default {
    data () {
        return {
            form: this.$form({
                input: {
                    validators: [
                        { rule: 'alpha' }
                    ]
                },
                inputSpaces: {
                    validators: [
                        { rule: 'alpha', allowSpaces: true },
                    ]
                },
                inputDashes: {
                    validators: [
                        { rule: 'alpha', allowDashes: true }
                    ]
                }
            })
        };
    }
}
~~~

</template>
<template slot="output">
<span class="_text-muted">// console.log(this.form);</span>
<pre>
<code>
{{ alphaValidatorForm | prettify }}
</code>
</pre>
</template>
</i-code-preview>

<i-code-preview title="Alphanumeric Validator" markup="alphanumeric" link="https://github.com/inkline/inkline/blob/master/src/validators">
<i-form :schema="alphaValidatorForm">
    <i-form-group>
        <i-input :schema="alphanumericValidatorForm.input" v-model="alphanumericValidatorForm.input.value" placeholder="This field should contain only letters and numbers" />
    </i-form-group>
    <i-form-group>
        <i-input :schema="alphanumericValidatorForm.inputSpaces" v-model="alphanumericValidatorForm.inputSpaces.value" placeholder="This field should contain only letters, numbers and spaces" />
    </i-form-group>
    <i-form-group>
        <i-input :schema="alphanumericValidatorForm.inputDashes" v-model="alphanumericValidatorForm.inputDashes.value" placeholder="This field should contain only letters, numbers and dashes" />
    </i-form-group>
</i-form>
<template slot="html">

~~~html
<i-form :schema="form">
    <i-form-group>
        <i-input :schema="form.input" v-model="form.input.value" placeholder="This field should contain only letters and numbers" />
    </i-form-group>
    <i-form-group>
        <i-input :schema="form.inputSpaces" v-model="form.inputSpaces.value" placeholder="This field should contain only letters, numbers and spaces" />
    </i-form-group>
    <i-form-group>
        <i-input :schema="form.inputDashes" v-model="form.inputDashes.value" placeholder="This field should contain only letters, numbers and dashes" />
    </i-form-group>
</i-form>
~~~

</template>
<template slot="js">

~~~js
export default {
    data () {
        return {
            form: this.$form({
                input: {
                    validators: [
                        { rule: 'alphanumeric' }
                    ]
                },
                inputSpaces: {
                    validators: [
                        { rule: 'alphanumeric', allowSpaces: true },
                    ]
                },
                inputDashes: {
                    validators: [
                        { rule: 'alphanumeric', allowDashes: true }
                    ]
                }
            })
        };
    }
}
~~~

</template>
<template slot="output">
<span class="_text-muted">// console.log(this.form);</span>
<pre>
<code>
{{ alphaValidatorForm | prettify }}
</code>
</pre>
</template>
</i-code-preview>


<i-code-preview title="Email Validator" markup="email" link="https://github.com/inkline/inkline/blob/master/src/validators">
<i-form :schema="emailValidatorForm">
    <i-form-group>
        <i-input :schema="emailValidatorForm.input" v-model="emailValidatorForm.input.value" placeholder="This field an is email" />
    </i-form-group>
</i-form>
<template slot="html">

~~~html
<i-form :schema="form">
    <i-form-group>
        <i-input :schema="form.input" v-model="form.input.value" placeholder="This field is an email" />
    </i-form-group>
</i-form>
~~~

</template>
<template slot="js">

~~~js
export default {
    data () {
        return {
            form: this.$form({
                input: {
                    validators: [
                        { rule: 'email' }
                    ]
                }
            })
        };
    }
}
~~~

</template>
<template slot="output">
<span class="_text-muted">// console.log(this.form);</span>
<pre>
<code>
{{ emailValidatorForm | prettify }}
</code>
</pre>
</template>
</i-code-preview>


<i-code-preview title="Max Validator" markup="max" link="https://github.com/inkline/inkline/blob/master/src/validators">
<i-form :schema="maxValidatorForm">
    <i-form-group>
        <i-input :schema="maxValidatorForm.input" v-model="maxValidatorForm.input.value" placeholder="This field accepts a maximum value of 100." />
    </i-form-group>
</i-form>
<template slot="html">

~~~html
<i-form :schema="form">
    <i-form-group>
        <i-input :schema="form.input" v-model="form.input.value" placeholder="This field accepts a maximum value of 100." />
    </i-form-group>
</i-form>
~~~

</template>
<template slot="js">

~~~js
export default {
    data () {
        return {
            form: this.$form({
                input: {
                    validators: [
                        { rule: 'max', value: 100 }
                    ]
                }
            })
        };
    }
}
~~~

</template>
<template slot="output">
<span class="_text-muted">// console.log(this.form);</span>
<pre>
<code>
{{ maxValidatorForm | prettify }}
</code>
</pre>
</template>
</i-code-preview>


<i-code-preview title="Min Validator" markup="min" link="https://github.com/inkline/inkline/blob/master/src/validators">
<i-form :schema="minValidatorForm">
    <i-form-group>
        <i-input :schema="minValidatorForm.input" v-model="minValidatorForm.input.value" placeholder="This field accepts a minimum value of 10." />
    </i-form-group>
</i-form>
<template slot="html">

~~~html
<i-form :schema="form">
    <i-form-group>
        <i-input :schema="form.input" v-model="form.input.value" placeholder="This field accepts a minimum value of 10." />
    </i-form-group>
</i-form>
~~~

</template>
<template slot="js">

~~~js
export default {
    data () {
        return {
            form: this.$form({
                input: {
                    validators: [
                        { rule: 'min', value: 10 }
                    ]
                }
            })
        };
    }
}
~~~

</template>
<template slot="output">
<span class="_text-muted">// console.log(this.form);</span>
<pre>
<code>
{{ minValidatorForm | prettify }}
</code>
</pre>
</template>
</i-code-preview>


<i-code-preview title="Max Length Validator" markup="maxLength" link="https://github.com/inkline/inkline/blob/master/src/validators">
<i-form :schema="maxLengthValidatorForm">
    <i-form-group>
        <i-input :schema="maxLengthValidatorForm.input" v-model="maxLengthValidatorForm.input.value" placeholder="This field accepts up to 12 characters." />
    </i-form-group>
</i-form>
<template slot="html">

~~~html
<i-form :schema="form">
    <i-form-group>
        <i-input :schema="form.input" v-model="form.input.value" placeholder="This field accepts up to 12 characters." />
    </i-form-group>
</i-form>
~~~

</template>
<template slot="js">

~~~js
export default {
    data () {
        return {
            form: this.$form({
                input: {
                    validators: [
                        { rule: 'maxLength', value: 12 }
                    ]
                }
            })
        };
    }
}
~~~

</template>
<template slot="output">
<span class="_text-muted">// console.log(this.form);</span>
<pre>
<code>
{{ maxLengthValidatorForm | prettify }}
</code>
</pre>
</template>
</i-code-preview>


<i-code-preview title="Min Length Validator" markup="minLength" link="https://github.com/inkline/inkline/blob/master/src/validators">
<i-form :schema="minLengthValidatorForm">
    <i-form-group>
        <i-input :schema="minLengthValidatorForm.input" v-model="minLengthValidatorForm.input.value" placeholder="This field requires at least 6 characters." />
    </i-form-group>
</i-form>
<template slot="html">

~~~html
<i-form :schema="form">
    <i-form-group>
        <i-input :schema="form.input" v-model="form.input.value" placeholder="This field requires at least 6 characters." />
    </i-form-group>
</i-form>
~~~

</template>
<template slot="js">

~~~js
export default {
    data () {
        return {
            form: this.$form({
                input: {
                    validators: [
                        { rule: 'minLength', value: 6 }
                    ]
                }
            })
        };
    }
}
~~~

</template>
<template slot="output">
<span class="_text-muted">// console.log(this.form);</span>
<pre>
<code>
{{ minLengthValidatorForm | prettify }}
</code>
</pre>
</template>
</i-code-preview>


<i-code-preview title="Number Validator" markup="number" link="https://github.com/inkline/inkline/blob/master/src/validators">
<i-form :schema="numberValidatorForm">
    <i-form-group>
        <i-input :schema="numberValidatorForm.input" v-model="numberValidatorForm.input.value" placeholder="This field should contain positive numbers" />
    </i-form-group>
    <i-form-group>
        <i-input :schema="numberValidatorForm.inputNegative" v-model="numberValidatorForm.inputNegative.value" placeholder="This field should contain positive or negative numbers" />
    </i-form-group>
    <i-form-group>
        <i-input :schema="numberValidatorForm.inputNegativeDecimal" v-model="numberValidatorForm.inputNegativeDecimal.value" placeholder="This field should contain positive or negative decimal numbers" />
    </i-form-group>
</i-form>
<template slot="html">

~~~html
<i-form :schema="form">
    <i-form-group>
        <i-input :schema="form.input" v-model="form.input.value" placeholder="This field should contain only numbers" />
    </i-form-group>
    <i-form-group>
        <i-input :schema="form.inputNegative" v-model="form.inputNegative.value" placeholder="This field should contain positive or negative numbers" />
    </i-form-group>
    <i-form-group>
        <i-input :schema="form.inputNegativeDecimal" v-model="form.inputNegativeDecimal.value" placeholder="This field should contain positive or negative decimal numbers" />
    </i-form-group>
</i-form>
~~~

</template>
<template slot="js">

~~~js
export default {
    data () {
        return {
            form: this.$form({
                input: {
                    validators: [
                        { rule: 'number' }
                    ]
                },
                inputNegative: {
                    validators: [
                        { rule: 'number', allowNegative: true }
                    ]
                },
                inputNegativeDecimal: {
                    validators: [
                        { rule: 'number', allowNegative: true, allowDecimal: true }
                    ]
                }
            })
        };
    }
}
~~~

</template>
<template slot="output">
<span class="_text-muted">// console.log(this.form);</span>
<pre>
<code>
{{ numberValidatorForm | prettify }}
</code>
</pre>
</template>
</i-code-preview>


<i-code-preview title="Required Validator" markup="required" link="https://github.com/inkline/inkline/blob/master/src/validators">
<i-form :schema="requiredValidatorForm">
    <i-form-group>
        <i-input :schema="requiredValidatorForm.input" v-model="requiredValidatorForm.input.value" placeholder="This field is required" />
    </i-form-group>
</i-form>
<template slot="html">

~~~html
<i-form :schema="form">
    <i-form-group>
        <i-input :schema="form.input" v-model="form.input.value" placeholder="This field is required" />
    </i-form-group>
</i-form>
~~~

</template>
<template slot="js">

~~~js
export default {
    data () {
        return {
            form: this.$form({
                input: {
                    validators: [
                        { rule: 'required' }
                    ]
                }
            })
        };
    }
}
~~~

</template>
<template slot="output">
<span class="_text-muted">// console.log(this.form);</span>
<pre>
<code>
{{ requiredValidatorForm | prettify }}
</code>
</pre>
</template>
</i-code-preview>


<i-code-preview title="Same As Validator" markup="sameAs" link="https://github.com/inkline/inkline/blob/master/src/validators">
<i-form :schema="sameAsValidatorForm">
    <i-form-group>
        <i-input :schema="sameAsValidatorForm.password" v-model="sameAsValidatorForm.password.value" type="password" placeholder="Password" />
    </i-form-group>
    <i-form-group>
        <i-input :schema="sameAsValidatorForm.passwordConfirmation" v-model="sameAsValidatorForm.passwordConfirmation.value" type="password" placeholder="Password Confirmation" />
    </i-form-group>
</i-form>
<template slot="html">

~~~html
<i-form :schema="form">
    <i-form-group>
        <i-input :schema="form.password" v-model="form.password.value" placeholder="Password" />
    </i-form-group>
    <i-form-group>
        <i-input :schema="form.passwordConfirmation" v-model="form.passwordConfirmation.value" placeholder="Password Confirmation" />
    </i-form-group>
</i-form>
~~~

</template>
<template slot="js">

~~~js
export default {
    data () {
        return {
            form: this.$form({
                password: {},
                passwordConfirmation: {
                    validators: [
                        { rule: 'sameAs', target: 'password' }
                    ]
                }
            })
        };
    }
}
~~~

</template>
<template slot="output">
<span class="_text-muted">// console.log(this.form);</span>
<pre>
<code>
{{ sameAsValidatorForm | prettify }}
</code>
</pre>
</template>
</i-code-preview>


### Custom Validator

You can provide a custom validation function that will be applied on the value of the input using the `custom` validator.

<i-code-preview title="Custom Validator" markup="custom" link="https://github.com/inkline/inkline/blob/master/src/validators">
<i-form :schema="customValidatorForm">
    <i-form-group>
        <i-input :schema="customValidatorForm.input" v-model="customValidatorForm.input.value" placeholder="This field is custom validated. It needs to contain 'inkline'" />
    </i-form-group>
</i-form>
<template slot="html">

~~~html
<i-form :schema="form">
    <i-form-group>
        <i-input :schema="form.input" v-model="form.input.value" placeholder="This field is custom validated. It needs to contain 'inkline'." />
    </i-form-group>
</i-form>
~~~

</template>
<template slot="js">

~~~js
export default {
    data () {
        return {
            form: this.$form({
                input: {
                    validators: [
                        { rule: 'custom', validator: (v) => /inkline/.test(v) }
                    ]
                }
            })
        };
    }
}
~~~

</template>
<template slot="output">
<span class="_text-muted">// console.log(this.form);</span>
<pre>
<code>
{{ customValidatorForm | prettify }}
</code>
</pre>
</template>
</i-code-preview>
