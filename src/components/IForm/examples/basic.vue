<script lang="ts" setup>
import {ref} from "vue";

const input = ref('');
const textarea = ref('');
const select = ref();
const options = ref([
    { id: 1, label: 'Option A' },
    { id: 2, label: 'Option B' },
    { id: 3, label: 'Option C' }
]);
const checkboxGroup = ref('');
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
    <i-form>
        <i-form-group>
            <i-form-label>Input</i-form-label>
            <i-input v-model="input" placeholder="Type something.." />
        </i-form-group>

        <i-form-group>
            <i-form-label>Textarea</i-form-label>
            <i-textarea v-model="textarea" placeholder="Write a comment.." />
        </i-form-group>

        <i-form-group>
            <i-form-label>Select</i-form-label>
            <i-select v-model="select" :options="options" placeholder="Choose an option" />
        </i-form-group>

        <i-form-group>
            <i-form-label>Checkbox Group</i-form-label>
            <i-checkbox-group v-model="checkboxGroup">
                <i-checkbox value="apple">Apple</i-checkbox>
                <i-checkbox value="banana">Banana</i-checkbox>

                <i-checkbox value="strawberry">Strawberry</i-checkbox>
                <i-checkbox value="mango">Mango</i-checkbox>
            </i-checkbox-group>
        </i-form-group>

        <i-form-group>
            <i-form-label>Radio Group</i-form-label>
            <i-radio-group v-model="radioGroup">
                <i-radio value="coconut">Coconut</i-radio>
                <i-radio value="passionfruit">Passion fruit</i-radio>
                <i-radio value="apricot">Apricot</i-radio>
            </i-radio-group>
        </i-form-group>

        <i-form-group>
            <i-form-label>Toggle</i-form-label>
            <i-toggle v-model="toggle">I confirm this toggle</i-toggle>
        </i-form-group>

        <i-form-group>
            <i-form-label>Checkbox</i-form-label>
            <i-checkbox v-model="checkbox">I accept the terms and conditions</i-checkbox>
        </i-form-group>

        <i-form-group>
            <i-button type="button" :loading="loading" @click="onSubmit"> Submit </i-button>
        </i-form-group>
    </i-form>
</template>
