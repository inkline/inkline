<script lang="ts" setup>
import { ref } from 'vue';

const input = ref('');
const textarea = ref('');
const select = ref();
const options = ref([
    { id: 1, label: 'Option A' },
    { id: 2, label: 'Option B' },
    { id: 3, label: 'Option C' }
]);
const checkboxGroup = ref([]);
const radioGroup = ref('');
const toggle = ref(false);
const checkbox = ref(false);
const loading = ref(false);

function onSubmit() {
    loading.value = true;

    setTimeout(() => {
        loading.value = false;
    }, 2000);
}
</script>

<template>
    <IForm>
        <IFormGroup>
            <IFormLabel>Input</IFormLabel>
            <IInput v-model="input" placeholder="Type something.." />
        </IFormGroup>

        <IFormGroup>
            <IFormLabel>Textarea</IFormLabel>
            <ITextarea v-model="textarea" placeholder="Write a comment.." />
        </IFormGroup>

        <IFormGroup>
            <IFormLabel>Select</IFormLabel>
            <ISelect v-model="select" :options="options" placeholder="Choose an option" />
        </IFormGroup>

        <IFormGroup>
            <IFormLabel>Checkbox Group</IFormLabel>
            <ICheckboxGroup v-model="checkboxGroup">
                <ICheckbox value="apple">Apple</ICheckbox>
                <ICheckbox value="banana">Banana</ICheckbox>

                <ICheckbox value="strawberry">Strawberry</ICheckbox>
                <ICheckbox value="mango">Mango</ICheckbox>
            </ICheckboxGroup>
        </IFormGroup>

        <IFormGroup>
            <IFormLabel>Radio Group</IFormLabel>
            <IRadioGroup v-model="radioGroup">
                <IRadio value="coconut">Coconut</IRadio>
                <IRadio value="passionfruit">Passion fruit</IRadio>
                <IRadio value="apricot">Apricot</IRadio>
            </IRadioGroup>
        </IFormGroup>

        <IFormGroup>
            <IFormLabel>Toggle</IFormLabel>
            <IToggle v-model="toggle">I confirm this toggle</IToggle>
        </IFormGroup>

        <IFormGroup>
            <IFormLabel>Checkbox</IFormLabel>
            <ICheckbox v-model="checkbox">I accept the terms and conditions</ICheckbox>
        </IFormGroup>

        <IFormGroup>
            <IButton type="button" :loading="loading" @click="onSubmit"> Submit </IButton>
        </IFormGroup>
    </IForm>
</template>
