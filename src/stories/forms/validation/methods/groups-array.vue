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
    <IForm v-model="schema">
        <IFormGroup name="group">
            <IFormGroup v-for="(_, index) in schema.group" :key="index">
                <IFormLabel>
                    Input for <code>group.{{ index }}</code>
                </IFormLabel>
                <IInput :name="`group.${index}`" placeholder="Type something.." />
                <IFormError :for="`group.${index}`" />
            </IFormGroup>
        </IFormGroup>
        <IFormGroup>
            <IButton type="button" @click="addField"> Add </IButton>&nbsp;
            <IButton type="button" @click="removeField"> Remove First </IButton>&nbsp;
            <IButton type="button" @click="replaceField"> Replace First </IButton>
        </IFormGroup>
    </IForm>

    <pre class="_margin-top:1">{{ prettySchema }}</pre>
</template>
