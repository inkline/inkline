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
        validators: ['required']
    },
    checkboxGroup: {
        validators: ['required']
    },
    radioGroup: {
        validators: ['required']
    },
    toggle: {
        validators: ['required']
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
    { id: 5, label: 'Erlich Bachman' }
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
    <i-form v-model="schema">
        <i-form-group>
            <i-form-label>Input</i-form-label>
            <i-input name="input" placeholder="Type something.." />
            <i-form-error />
        </i-form-group>

        <i-form-group>
            <i-form-label>Number Input</i-form-label>
            <i-number-input name="numberInput" placeholder="Type something.." />
            <i-form-error />
        </i-form-group>

        <i-form-group>
            <i-form-label>Textarea</i-form-label>
            <i-textarea name="textarea" placeholder="Write a comment.." />
        </i-form-group>

        <i-form-group>
            <i-form-label>Select</i-form-label>
            <i-select name="select" :options="options" placeholder="Choose an option" />
        </i-form-group>

        <i-form-group>
            <i-form-label>Checkbox</i-form-label>
            <i-checkbox name="checkbox">Apple</i-checkbox>
        </i-form-group>

        <i-form-group>
            <i-form-label>Checkbox Group</i-form-label>
            <i-checkbox-group name="checkboxGroup">
                <i-checkbox value="apple">Apple</i-checkbox>
                <i-checkbox value="banana">Banana</i-checkbox>
                <i-checkbox value="strawberry">Strawberry</i-checkbox>
                <i-checkbox value="mango">Mango</i-checkbox>
            </i-checkbox-group>
        </i-form-group>

        <i-form-group>
            <i-form-label>Radio Group</i-form-label>
            <i-radio-group name="radioGroup">
                <i-radio value="coconut">Coconut</i-radio>
                <i-radio value="passionfruit">Passion fruit</i-radio>
                <i-radio value="apricot">Apricot</i-radio>
            </i-radio-group>
        </i-form-group>

        <i-form-group>
            <i-form-label>Toggle</i-form-label>
            <i-toggle name="toggle" />
        </i-form-group>

        <i-form-group>
            <i-button type="button" :loading="loading" @click="onSubmit"> Submit </i-button>
        </i-form-group>

        <pre>{{ prettySchema }}</pre>
    </i-form>
</template>
