<script lang="ts" setup>
import { computed, ref } from 'vue';
import { useForm } from '@inkline/validation';
import type { FormOption } from '@inkline/inkline/types';

const { form, schema, validate } = useForm<{
    input: string;
    numberInput: number;
    textarea: string;
    checkbox: boolean;
    checkboxGroup: string[];
    checkboxButtons: string[];
    radioGroup: string;
    radioButtons: string;
    toggle: boolean;
    select: string;
}>({
    input: {
        validators: ['required']
    },
    numberInput: {
        validators: ['required']
    },
    textarea: {
        validators: ['required']
    },
    checkbox: {
        validators: [{ name: 'required', invalidateFalse: true }]
    },
    checkboxGroup: {
        validators: [{ name: 'minLength', value: 1 }]
    },
    checkboxButtons: {
        validators: [{ name: 'minLength', value: 1 }]
    },
    radioGroup: {
        validators: ['required']
    },
    radioButtons: {
        validators: ['required']
    },
    toggle: {
        validators: [{ name: 'required', invalidateFalse: true }]
    },
    select: {
        validators: ['required']
    }
});

const selectOptions = ref<FormOption[]>([
    { id: 1, label: 'Richard Hendricks' },
    { id: 2, label: 'Bertram Gilfoyle' },
    { id: 3, label: 'Dinesh Chugtai' },
    { id: 4, label: 'Jared Dunn' },
    { id: 5, label: 'Erlich Bachman' },
    { id: '', label: 'Unknown' }
]);

const checkableOptions = ref<FormOption[]>([
    { id: 'apple', label: 'Apple' },
    { id: 'banana', label: 'Banana' },
    { id: 'strawberry', label: 'Strawberry' },
    { id: 'mango', label: 'Mango' }
]);

const loading = ref(false);

async function onSubmit() {
    loading.value = true;

    await validate();

    setTimeout(() => {
        loading.value = false;
    }, 2000);
}

const prettySchema = computed(() => {
    return JSON.stringify(schema.value, null, 4);
});

const prettyFormValues = computed(() => {
    return JSON.stringify(form.value, null, 4);
});
</script>
<template>
    <Form v-model="schema">
        <FormGroup>
            <FormLabel>Input</FormLabel>
            <Input name="input" placeholder="Type something.." />
            <FormError for="input" />
        </FormGroup>

        <FormGroup>
            <FormLabel>Number Input</FormLabel>
            <NumberInput name="numberInput" placeholder="Type something.." />
            <FormError for="numberInput" />
        </FormGroup>

        <FormGroup>
            <FormLabel>Textarea</FormLabel>
            <Textarea name="textarea" placeholder="Write a comment.." />
            <FormError for="textarea" />
        </FormGroup>

        <FormGroup>
            <FormLabel>Select</FormLabel>
            <Select name="select" :options="selectOptions" placeholder="Choose an option" />
            <FormError for="select" />
        </FormGroup>

        <FormGroup>
            <FormLabel>Checkbox</FormLabel>
            <Checkbox name="checkbox">Apple</Checkbox>
            <FormError for="checkbox" />
        </FormGroup>

        <FormGroup>
            <FormLabel>Checkbox Group</FormLabel>
            <CheckboxGroup :options="checkableOptions" name="checkboxGroup" />
            <FormError for="checkboxGroup" />
        </FormGroup>

        <FormGroup>
            <FormLabel>Checkbox Buttons</FormLabel><br />
            <CheckboxButtons :options="checkableOptions" name="checkboxButtons" />
            <FormError for="checkboxButtons" />
        </FormGroup>

        <FormGroup>
            <FormLabel>Radio Group</FormLabel>
            <RadioGroup :options="checkableOptions" name="radioGroup" />
            <FormError for="radioGroup" />
        </FormGroup>

        <FormGroup>
            <FormLabel>Radio Buttons</FormLabel><br />
            <RadioButtons :options="checkableOptions" name="radioButtons" />
            <FormError for="radioButtons" />
        </FormGroup>

        <FormGroup>
            <FormLabel>Toggle</FormLabel>
            <Toggle name="toggle" />
            <FormError for="toggle" />
        </FormGroup>

        <FormGroup>
            <Button type="button" :loading="loading" @click="onSubmit">Submit</Button>
        </FormGroup>

        <pre class="_margin-top:2 _text:muted">{{ prettyFormValues }}</pre>
        <pre class="_margin-top:2 _text:muted">{{ prettySchema }}</pre>
    </Form>
</template>
