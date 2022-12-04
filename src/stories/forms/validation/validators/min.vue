<script>
    export default {
        data() {
            return {
                form: this.$inkline.form({
                    input: {
                        validators: [{ name: 'min', value: 10 }]
                    }
                })
            };
        }
    };
</script>
<template>
    <i-form v-model="form">
        <i-form-group>
            <i-input name="input" placeholder="This field accepts a minimum value of 10." />
            <i-form-error for="input" />
        </i-form-group>
    </i-form>
</template>

