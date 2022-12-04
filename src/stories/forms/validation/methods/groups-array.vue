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
        methods: {
            addField() {
                this.schema.group.push(
                    this.$inkline.form({
                        value: 'Added Field',
                        validators: [{ name: 'required' }]
                    })
                );
            },
            removeField() {
                this.schema.group.splice(0, 1);
            },
            replaceField() {
                this.schema.group.splice(
                    0,
                    1,
                    this.$inkline.form({
                        value: 'Spliced Field',
                        validators: [{ name: 'required' }]
                    })
                );
            }
        }
    };
</script>
<template>
    <i-form v-model="schema">
        <i-form-group name="group">
            <i-form-group v-for="(field, index) in schema.group">
                <i-form-label>Input {{index}}</i-form-label>
                <i-input :name="`${index}`" placeholder="Type something.." />
                <i-form-error :for="`${index}`" />
            </i-form-group>
        </i-form-group>
        <i-form-group>
            <i-button @click="addField" type="button">Add</i-button>&nbsp;
            <i-button @click="removeField" type="button">Remove First</i-button>&nbsp;
            <i-button @click="replaceField" type="button">Replace First</i-button>
        </i-form-group>
    </i-form>
</template>

