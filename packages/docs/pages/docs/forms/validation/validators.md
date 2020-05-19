# Form Validators
## Validators are configurable functions used to check whether an input value matches a specific criteria.{.lead}

There are several validation options that can be used in the `validators` field:

<i-code-preview title="Alpha Validator" markup="alpha">
<i-form v-model="alphaValidatorForm">
    <i-form-group>
        <i-input :schema="alphaValidatorForm.input" placeholder="This field should contain only letters" />
    </i-form-group>
    <i-form-group>
        <i-input :schema="alphaValidatorForm.inputSpaces" placeholder="This field should contain only letters and spaces" />
    </i-form-group>
    <i-form-group>
        <i-input :schema="alphaValidatorForm.inputDashes" placeholder="This field should contain only letters and dashes" />
    </i-form-group>
</i-form>
<template slot="html">

~~~html
<i-form v-model="form">
    <i-form-group>
        <i-input :schema="form.input" placeholder="This field should contain only letters" />
    </i-form-group>
    <i-form-group>
        <i-input :schema="form.inputSpaces" placeholder="This field should contain only letters and spaces" />
    </i-form-group>
    <i-form-group>
        <i-input :schema="form.inputDashes" placeholder="This field should contain only letters and dashes" />
    </i-form-group>
</i-form>
~~~

</template>
<template slot="js">

~~~js
export default {
    data () {
        return {
            form: this.$inkline.form({
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

<i-code-preview title="Alphanumeric Validator" markup="alphanumeric">
<i-form v-model="alphaValidatorForm">
    <i-form-group>
        <i-input :schema="alphanumericValidatorForm.input" placeholder="This field should contain only letters and numbers" />
    </i-form-group>
    <i-form-group>
        <i-input :schema="alphanumericValidatorForm.inputSpaces" placeholder="This field should contain only letters, numbers and spaces" />
    </i-form-group>
    <i-form-group>
        <i-input :schema="alphanumericValidatorForm.inputDashes" placeholder="This field should contain only letters, numbers and dashes" />
    </i-form-group>
</i-form>
<template slot="html">

~~~html
<i-form v-model="form">
    <i-form-group>
        <i-input :schema="form.input" placeholder="This field should contain only letters and numbers" />
    </i-form-group>
    <i-form-group>
        <i-input :schema="form.inputSpaces" placeholder="This field should contain only letters, numbers and spaces" />
    </i-form-group>
    <i-form-group>
        <i-input :schema="form.inputDashes" placeholder="This field should contain only letters, numbers and dashes" />
    </i-form-group>
</i-form>
~~~

</template>
<template slot="js">

~~~js
export default {
    data () {
        return {
            form: this.$inkline.form({
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


<i-code-preview title="Email Validator" markup="email">
<i-form v-model="emailValidatorForm">
    <i-form-group>
        <i-input :schema="emailValidatorForm.input" placeholder="This field an is email" />
    </i-form-group>
</i-form>
<template slot="html">

~~~html
<i-form v-model="form">
    <i-form-group>
        <i-input :schema="form.input" placeholder="This field is an email" />
    </i-form-group>
</i-form>
~~~

</template>
<template slot="js">

~~~js
export default {
    data () {
        return {
            form: this.$inkline.form({
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


<i-code-preview title="Max Validator" markup="max">
<i-form v-model="maxValidatorForm">
    <i-form-group>
        <i-input :schema="maxValidatorForm.input" placeholder="This field accepts a maximum value of 100." />
    </i-form-group>
</i-form>
<template slot="html">

~~~html
<i-form v-model="form">
    <i-form-group>
        <i-input :schema="form.input" placeholder="This field accepts a maximum value of 100." />
    </i-form-group>
</i-form>
~~~

</template>
<template slot="js">

~~~js
export default {
    data () {
        return {
            form: this.$inkline.form({
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


<i-code-preview title="Min Validator" markup="min">
<i-form v-model="minValidatorForm">
    <i-form-group>
        <i-input :schema="minValidatorForm.input" placeholder="This field accepts a minimum value of 10." />
    </i-form-group>
</i-form>
<template slot="html">

~~~html
<i-form v-model="form">
    <i-form-group>
        <i-input :schema="form.input" placeholder="This field accepts a minimum value of 10." />
    </i-form-group>
</i-form>
~~~

</template>
<template slot="js">

~~~js
export default {
    data () {
        return {
            form: this.$inkline.form({
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


<i-code-preview title="Max Length Validator" markup="maxLength">
<i-form v-model="maxLengthValidatorForm">
    <i-form-group>
        <i-input :schema="maxLengthValidatorForm.input" placeholder="This field accepts up to 12 characters." />
    </i-form-group>
</i-form>
<template slot="html">

~~~html
<i-form v-model="form">
    <i-form-group>
        <i-input :schema="form.input" placeholder="This field accepts up to 12 characters." />
    </i-form-group>
</i-form>
~~~

</template>
<template slot="js">

~~~js
export default {
    data () {
        return {
            form: this.$inkline.form({
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


<i-code-preview title="Min Length Validator" markup="minLength">
<i-form v-model="minLengthValidatorForm">
    <i-form-group>
        <i-input :schema="minLengthValidatorForm.input" placeholder="This field requires at least 6 characters." />
    </i-form-group>
</i-form>
<template slot="html">

~~~html
<i-form v-model="form">
    <i-form-group>
        <i-input :schema="form.input" placeholder="This field requires at least 6 characters." />
    </i-form-group>
</i-form>
~~~

</template>
<template slot="js">

~~~js
export default {
    data () {
        return {
            form: this.$inkline.form({
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


<i-code-preview title="Number Validator" markup="number">
<i-form v-model="numberValidatorForm">
    <i-form-group>
        <i-input :schema="numberValidatorForm.input" placeholder="This field should contain positive numbers" />
    </i-form-group>
    <i-form-group>
        <i-input :schema="numberValidatorForm.inputNegative" placeholder="This field should contain positive or negative numbers" />
    </i-form-group>
    <i-form-group>
        <i-input :schema="numberValidatorForm.inputNegativeDecimal" placeholder="This field should contain positive or negative decimal numbers" />
    </i-form-group>
</i-form>
<template slot="html">

~~~html
<i-form v-model="form">
    <i-form-group>
        <i-input :schema="form.input" placeholder="This field should contain only numbers" />
    </i-form-group>
    <i-form-group>
        <i-input :schema="form.inputNegative" placeholder="This field should contain positive or negative numbers" />
    </i-form-group>
    <i-form-group>
        <i-input :schema="form.inputNegativeDecimal" placeholder="This field should contain positive or negative decimal numbers" />
    </i-form-group>
</i-form>
~~~

</template>
<template slot="js">

~~~js
export default {
    data () {
        return {
            form: this.$inkline.form({
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


<i-code-preview title="Required Validator" markup="required">
<i-form v-model="requiredValidatorForm">
    <i-form-group>
        <i-input :schema="requiredValidatorForm.input" placeholder="This field is required" />
    </i-form-group>
</i-form>
<template slot="html">

~~~html
<i-form v-model="form">
    <i-form-group>
        <i-input :schema="form.input" placeholder="This field is required" />
    </i-form-group>
</i-form>
~~~

</template>
<template slot="js">

~~~js
export default {
    data () {
        return {
            form: this.$inkline.form({
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


<i-code-preview title="Same As Validator" markup="sameAs">
<i-form v-model="sameAsValidatorForm">
    <i-form-group>
        <i-input :schema="sameAsValidatorForm.password" type="password" placeholder="Password" />
    </i-form-group>
    <i-form-group>
        <i-input :schema="sameAsValidatorForm.passwordConfirmation" type="password" placeholder="Password Confirmation" />
    </i-form-group>
</i-form>
<template slot="html">

~~~html
<i-form v-model="form">
    <i-form-group>
        <i-input :schema="form.password" placeholder="Password" />
    </i-form-group>
    <i-form-group>
        <i-input :schema="form.passwordConfirmation" placeholder="Password Confirmation" />
    </i-form-group>
</i-form>
~~~

</template>
<template slot="js">

~~~js
export default {
    data () {
        return {
            form: this.$inkline.form({
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

<i-code-preview title="Custom Validator" markup="custom">
<i-form v-model="customValidatorForm">
    <i-form-group>
        <i-input :schema="customValidatorForm.input" placeholder="This field is custom validated. It needs to contain 'inkline'" />
    </i-form-group>
</i-form>
<template slot="html">

~~~html
<i-form v-model="form">
    <i-form-group>
        <i-input :schema="form.input" placeholder="This field is custom validated. It needs to contain 'inkline'." />
    </i-form-group>
</i-form>
~~~

</template>
<template slot="js">

~~~js
export default {
    data () {
        return {
            form: this.$inkline.form({
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
