<script lang="ts" setup>
import { computed, ref } from 'vue';
import { useForm } from '@inkline/composables';
import type { SelectOption, FormOption } from '@inkline/inkline/types';

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

const selectOptions = ref<SelectOption[]>([
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
    <IForm v-model="schema">
        <IFormGroup>
            <IFormLabel>Input</IFormLabel>
            <IInput name="input" placeholder="Type something.." />
            <IFormError for="input" />
        </IFormGroup>

        <IFormGroup>
            <IFormLabel>Number Input</IFormLabel>
            <INumberInput name="numberInput" placeholder="Type something.." />
            <IFormError for="numberInput" />
        </IFormGroup>

        <IFormGroup>
            <IFormLabel>Textarea</IFormLabel>
            <ITextarea name="textarea" placeholder="Write a comment.." />
            <IFormError for="textarea" />
        </IFormGroup>

        <IFormGroup>
            <IFormLabel>Select</IFormLabel>
            <ISelect name="select" :options="selectOptions" placeholder="Choose an option" />
            <IFormError for="select" />
        </IFormGroup>

        <IFormGroup>
            <IFormLabel>Checkbox</IFormLabel>
            <ICheckbox name="checkbox">Apple</ICheckbox>
            <IFormError for="checkbox" />
        </IFormGroup>

        <IFormGroup>
            <IFormLabel>Checkbox Group</IFormLabel>
            <ICheckboxGroup :options="checkableOptions" name="checkboxGroup" />
            <IFormError for="checkboxGroup" />
        </IFormGroup>

        <IFormGroup>
            <IFormLabel>Checkbox Buttons</IFormLabel><br />
            <ICheckboxButtons :options="checkableOptions" name="checkboxButtons" />
            <IFormError for="checkboxButtons" />
        </IFormGroup>

        <IFormGroup>
            <IFormLabel>Radio Group</IFormLabel>
            <IRadioGroup :options="checkableOptions" name="radioGroup" />
            <IFormError for="radioGroup" />
        </IFormGroup>

        <IFormGroup>
            <IFormLabel>Radio Buttons</IFormLabel><br />
            <IRadioButtons :options="checkableOptions" name="radioButtons" />
            <IFormError for="radioButtons" />
        </IFormGroup>

        <IFormGroup>
            <IFormLabel>Toggle</IFormLabel>
            <IToggle name="toggle" />
            <IFormError for="toggle" />
        </IFormGroup>

        <IFormGroup>
            <IButton type="button" :loading="loading" @click="onSubmit">Submit</IButton>
        </IFormGroup>

        <pre class="_margin-top:2 _text:muted">{{ prettyFormValues }}</pre>
        <pre class="_margin-top:2 _text:muted">{{ prettySchema }}</pre>
    </IForm>
</template>
