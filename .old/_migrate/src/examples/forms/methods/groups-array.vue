<script lang="ts" setup>
import { useForm } from '@inkline/validation';
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
    <Form v-model="schema">
        <FormGroup>
            <FormGroup v-for="(_item, index) in schema.items" :key="index">
                <FormLabel>
                    Input for <code>items.{{ index }}</code>
                </FormLabel>
                <Input :name="`items.${index}`" placeholder="Type something.." />
                <FormError :for="`items.${index}`" />
            </FormGroup>
        </FormGroup>
        <FormGroup>
            <Button type="button" @click="addField"> Add </Button>&nbsp;
            <Button type="button" @click="removeField"> Remove First </Button>&nbsp;
            <Button type="button" @click="replaceField"> Replace First </Button>
        </FormGroup>
    </Form>

    <pre class="_margin-top:1">{{ prettySchema }}</pre>
</template>
