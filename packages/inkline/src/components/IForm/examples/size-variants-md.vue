<script lang="ts">
export default {
    data() {
        return {
            input: '',
            textarea: '',
            select: null,
            options: [
                { id: 1, label: 'Option A' },
                { id: 2, label: 'Option B' },
                { id: 3, label: 'Option C' }
            ],
            checkboxGroup: ['apple'],
            radioGroup: 'coconut',
            checkbox: true,
            toggle: true,
            loading: false
        };
    },
    methods: {
        onSubmit() {
            this.loading = true;

            setTimeout(() => {
                this.loading = false;
            }, 2000);
        }
    }
};
</script>

<template>
    <IForm size="md" @submit="onSubmit">
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
            <IButton type="submit" :loading="loading"> Submit </IButton>
        </IFormGroup>
    </IForm>
</template>
