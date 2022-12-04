<script>
    export default {
        data() {
            return {
                schema: this.$inkline.form({
                    input: {
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
            <i-form-label for="input-with-custom-error-visibility"
                >Input validated on input</i-form-label
            >
            <i-input
                id="input-with-custom-error-visibility"
                name="input"
                placeholder="Type something.."
                :error="['invalid']"
            />
            <i-form-error for="input" :visible="['invalid']" />
        </i-form-group>
    </i-form>
</template>

