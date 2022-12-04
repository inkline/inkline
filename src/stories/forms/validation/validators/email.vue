<script>
    export default {
        data() {
            return {
                form: this.$inkline.form({
                    input: {
                        validators: [{ name: 'email' }]
                    }
                })
            };
        }
    };
</script>
<template>
    <i-form v-model="form">
        <i-form-group>
            <i-input name="input" placeholder="This field should contain an email" />
            <i-form-error for="input" />
        </i-form-group>
    </i-form>
</template>

