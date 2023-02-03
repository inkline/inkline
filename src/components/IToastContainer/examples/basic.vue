<script lang="ts">
import { useToast } from "@inkline/inkline/composables";
import { defineComponent, ref } from "vue";

export default defineComponent({
    setup() {
        const toastService = useToast();

        const toastPosition = ref('');
        const toastColor = ref('');

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
            toastService.show({
                title: 'Toast title',
                message: 'Toast message',
                position: toastPosition.value,
                color: toastColor.value
            });
        }

        return { toastPosition, toastPositionOptions, toastColor, toastColorOptions, onClickShowToast };
    }
});
</script>
<template>
    <div>
        <IToastContainer />
        <ISelect v-model="toastPosition" label="id" :options="toastPositionOptions" placeholder="Toast position" />
        <ISelect v-model="toastColor" label="id" :options="toastColorOptions" placeholder="Toast color" />
        <IInput placeholder="Toast duration" />
        <IButton class="_margin-top:1" @click="onClickShowToast">Show toast</IButton>
    </div>
</template>
