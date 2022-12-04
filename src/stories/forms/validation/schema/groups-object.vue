<script>
    export default {
        data() {
            return {
                schema: this.$inkline.form({
                    group: {
                        input1: {
                            validators: [{ name: 'required' }]
                        },
                        input2: {
                            validators: ['required']
                        }
                    }
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
            <i-form-group>
                <i-form-label>Input 1</i-form-label>
                <i-input name="input1" placeholder="Type something.." />
                <i-form-error for="input1" />
            </i-form-group>
            <i-form-group>
                <i-form-label>Input 2</i-form-label>
                <i-input name="input2" placeholder="Type something.." />
                <i-form-error for="input2" />
            </i-form-group>
        </i-form-group>
        <p>Group validation status: <strong>{{ groupValidationStatus }}</strong></p>
    </i-form>
</template>

