<script>
    export default {
        data() {
            return {
                schema: this.$inkline.form({
                    input: {
                        validateOn: 'input',
                        validators: [{ name: 'minLength', value: 5 }]
                    }
                })
            };
        }
    };
</script>
<template>
    <i-form v-model="schema">
        <i-form-group>
            <i-form-label for="input-with-custom-validation-event"
                >Input validated on input</i-form-label
            >
            <i-input
                id="input-with-custom-validation-event"
                name="input"
                placeholder="Type something.."
            />
            <i-form-error for="input" :visible="['invalid']" />
        </i-form-group>
    </i-form>
</template>

