<script>
export default {
    data() {
        return {
            form: this.$inkline.form({
                input: {
                    validators: [{ name: 'number' }]
                },
                inputNegative: {
                    validators: [{ name: 'number', allowNegative: true }]
                },
                inputNegativeDecimal: {
                    validators: [{ name: 'number', allowNegative: true, allowDecimal: true }]
                }
            })
        };
    }
};
</script>
<template>
    <i-form v-model="form">
        <i-form-group>
            <i-input name="input" placeholder="This field should contain only numbers" />
            <i-form-error for="input" />
        </i-form-group>
        <i-form-group>
            <i-input
                name="inputNegative"
                placeholder="This field should contain positive or negative numbers"
            />
            <i-form-error for="inputNegative" />
        </i-form-group>
        <i-form-group>
            <i-input
                name="inputNegativeDecimal"
                placeholder="This field should contain positive or negative decimal numbers"
            />
            <i-form-error for="inputNegativeDecimal" />
        </i-form-group>
    </i-form>
</template>
