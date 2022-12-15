<script lang="ts" setup>
import { useForm } from '@inkline/inkline/composables';
import { computed } from 'vue';

const schema = useForm({
    group: [
        {
            validators: [{ name: 'required' }]
        },
        {
            validators: ['required']
        }
    ]
});

const prettySchema = computed(() => {
    return JSON.stringify(schema.value, null, 4);
});

function addField() {
    const { value: newField } = useForm({
        value: 'Added Field',
        validators: [{ name: 'required' }]
    });

    schema.value.group.push(newField);
}

function removeField() {
    schema.value.group.splice(0, 1);
}

function replaceField() {
    const { value: newField } = useForm({
        value: 'Spliced Field',
        validators: [{ name: 'required' }]
    });

    schema.value.group.splice(0, 1, newField);
}
</script>
<template>
    <i-form v-model="schema">
        <i-form-group name="group">
            <i-form-group v-for="(_, index) in schema.group" :key="index">
                <i-form-label>
                    Input for <code>group.{{ index }}</code>
                </i-form-label>
                <i-input :name="`group.${index}`" placeholder="Type something.." />
                <i-form-error :for="`group.${index}`" />
            </i-form-group>
        </i-form-group>
        <i-form-group>
            <i-button type="button" @click="addField"> Add </i-button>&nbsp;
            <i-button type="button" @click="removeField"> Remove First </i-button>&nbsp;
            <i-button type="button" @click="replaceField"> Replace First </i-button>
        </i-form-group>
    </i-form>

    <pre>{{ prettySchema }}</pre>
</template>
