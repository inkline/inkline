<script>
export default {
    data() {
        return {
            schema: this.$inkline.form({
                group: [
                    {
                        validators: [{ name: 'required' }]
                    },
                    {
                        validators: ['required']
                    }
                ]
            })
        };
    },
    computed: {
        groupValidationStatus() {
            return this.schema.group.dirty
                ? this.schema.group.invalid
                    ? 'Invalid'
                    : 'Valid'
                : 'Pending';
        }
    }
};
</script>
<template>
    <i-form v-model="schema">
        <i-form-group name="group">
            <i-form-group v-for="(field, index) in schema.group" :key="index">
                <i-form-label>Input {{ index }}</i-form-label>
                <i-input :name="`${index}`" placeholder="Type something.." />
                <i-form-error :for="`${index}`" />
            </i-form-group>
        </i-form-group>
        <p>
            Group validation status: <strong>{{ groupValidationStatus }}</strong>
        </p>
    </i-form>
</template>
