<script lang="ts" setup>
import { useForm } from '@inkline/composables';
import { computed } from 'vue';
import { createFormFieldSchema } from '@inkline/validation';

const { schema } = useForm<{
    items: string[];
}>({
    items: [
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
    const newField = createFormFieldSchema({
        value: 'Added Field',
        validators: [{ name: 'required' }]
    });

    schema.value.items.push(newField);
}

function removeField() {
    schema.value.items.splice(0, 1);
}

function replaceField() {
    const newField = createFormFieldSchema({
        value: 'Spliced Field',
        validators: [{ name: 'required' }]
    });

    schema.value.items.splice(0, 1, newField);
}
</script>
<template>
    <IForm v-model="schema">
        <IFormGroup>
            <IFormGroup v-for="(_item, index) in schema.items" :key="index">
                <IFormLabel>
                    Input for <code>items.{{ index }}</code>
                </IFormLabel>
                <IInput :name="`items.${index}`" placeholder="Type something.." />
                <IFormError :for="`items.${index}`" />
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
