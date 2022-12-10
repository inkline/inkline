<script>
export default {
    data() {
        return {
            form: this.$inkline.form({
                input: {
                    validators: [{ name: 'required' }]
                }
            })
        };
    }
};
</script>
<template>
    <i-form v-model="form">
        <i-form-group>
            <i-input name="input" placeholder="This field is required" />
            <i-form-error for="input" />
        </i-form-group>
    </i-form>
</template>
