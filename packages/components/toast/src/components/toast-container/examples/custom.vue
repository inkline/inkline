<script setup lang="ts">
import { useToast, FormGroup } from 'inkline';
import { ref } from 'vue';

const toastService = useToast();

const toastPosition = ref('');
const toastColor = ref('');
const toastDuration = ref('');

const toastPositionOptions = [
    { id: 'top-left' },
    { id: 'top' },
    { id: 'top-right' },
    { id: 'right' },
    { id: 'bottom-right' },
    { id: 'bottom' },
    { id: 'bottom-left' },
    { id: 'left' }
];

const toastColorOptions = [
    { id: 'light' },
    { id: 'dark' },
    { id: 'info' },
    { id: 'success' },
    { id: 'warning' },
    { id: 'danger' }
];

function onClickShowToast() {
    const duration = parseInt(toastDuration.value);

    toastService.show({
        title: 'Toast title',
        message: 'Toast message',
        position: toastPosition.value,
        color: toastColor.value,
        duration: isNaN(duration) ? undefined : duration
    });
}
</script>
<template>
    <Form>
        <FormGroup>
            <Select
                v-model="toastPosition"
                label="{{id}}"
                :options="toastPositionOptions"
                placeholder="Toast position"
            />
        </FormGroup>
        <FormGroup>
            <Select
                v-model="toastColor"
                label="{{id}}"
                :options="toastColorOptions"
                placeholder="Toast color"
            />
        </FormGroup>
        <FormGroup>
            <Input v-model="toastDuration" placeholder="Toast duration" />
        </FormGroup>
        <Button class="_margin-top:1" @click="onClickShowToast">Show toast</Button>
    </Form>
</template>
