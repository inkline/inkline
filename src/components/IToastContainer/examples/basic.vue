<script lang="ts">
import { useToast } from '@inkline/inkline/composables';
import { defineComponent, h, ref } from 'vue';
import IFormGroup from '@inkline/inkline/components/IFormGroup/IFormGroup.vue';

export default defineComponent({
    components: { IFormGroup },
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

        return {
            toastPosition,
            toastPositionOptions,
            toastColor,
            toastColorOptions,
            onClickShowToast
        };
    }
});
</script>
<template>
    <IToastContainer />
    <IForm>
        <IFormGroup>
            <ISelect
                v-model="toastPosition"
                label="id"
                :options="toastPositionOptions"
                placeholder="Toast position"
            />
        </IFormGroup>
        <IFormGroup>
            <ISelect
                v-model="toastColor"
                label="id"
                :options="toastColorOptions"
                placeholder="Toast color"
            />
        </IFormGroup>
        <IFormGroup>
            <IInput placeholder="Toast duration" />
        </IFormGroup>
        <IButton class="_margin-top:1" @click="onClickShowToast">Show toast</IButton>
    </IForm>
</template>
