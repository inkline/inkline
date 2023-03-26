<script lang="ts" setup>
import { computed, ref } from 'vue';
import { useForm } from '@inkline/inkline/composables';
import { validate } from '@inkline/inkline/validation';

const schema = useForm({
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
        validators: ['required']
    },
    radioGroup: {
        validators: ['required']
    },
    toggle: {
        validators: [{ name: 'required', invalidateFalse: true }]
    },
    select: {
        validators: ['required']
    }
});

const options = ref([
    { id: 1, label: 'Richard Hendricks' },
    { id: 2, label: 'Bertram Gilfoyle' },
    { id: 3, label: 'Dinesh Chugtai' },
    { id: 4, label: 'Jared Dunn' },
    { id: 5, label: 'Erlich Bachman' },
    { id: '', label: 'Unknown' }
]);

const loading = ref(false);

const prettySchema = computed(() => {
    return JSON.stringify(schema.value, null, 4);
});

function onSubmit() {
    loading.value = true;

    validate(schema.value);

    setTimeout(() => {
        loading.value = false;
    }, 2000);
}
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
            <ISelect name="select" :options="options" placeholder="Choose an option" />
            <IFormError for="select" />
        </IFormGroup>

        <IFormGroup>
            <IFormLabel>Checkbox</IFormLabel>
            <ICheckbox name="checkbox">Apple</ICheckbox>
            <IFormError for="checkbox" />
        </IFormGroup>

        <IFormGroup>
            <IFormLabel>Checkbox Group</IFormLabel>
            <ICheckboxGroup name="checkboxGroup">
                <ICheckbox value="apple">Apple</ICheckbox>
                <ICheckbox value="banana">Banana</ICheckbox>
                <ICheckbox value="strawberry">Strawberry</ICheckbox>
                <ICheckbox value="mango">Mango</ICheckbox>
            </ICheckboxGroup>
            <IFormError for="checkboxGroup" />
        </IFormGroup>

        <IFormGroup>
            <IFormLabel>Radio Group</IFormLabel>
            <IRadioGroup name="radioGroup">
                <IRadio value="coconut">Coconut</IRadio>
                <IRadio value="passionfruit">Passion fruit</IRadio>
                <IRadio value="apricot">Apricot</IRadio>
                <IRadio value="">None</IRadio>
            </IRadioGroup>
            <IFormError for="radioGroup" />
        </IFormGroup>

        <IFormGroup>
            <IFormLabel>Toggle</IFormLabel>
            <IToggle name="toggle" />
            <IFormError for="toggle" />
        </IFormGroup>

        <IFormGroup>
            <IButton type="button" :loading="loading" @click="onSubmit">Submit</IButton>
        </IFormGroup>

        <pre class="_margin-top:2 _text:muted">{{ prettySchema }}</pre>
    </IForm>
</template>
