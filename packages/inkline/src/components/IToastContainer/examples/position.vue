<script lang="ts">
import { useToast } from '@inkline/inkline';
import { defineComponent } from 'vue';

export default defineComponent({
    setup() {
        const toast = useToast();

        function showTopLeftToast() {
            toast.show({
                title: 'Top-left Toast',
                message: 'This toast is positioned at the top-left corner of the screen',
                position: 'top-left'
            });
        }

        function showTopToast() {
            toast.show({
                title: 'Top Toast',
                message: 'This toast is positioned at the top of the screen',
                position: 'top'
            });
        }

        function showTopRightToast() {
            toast.show({
                title: 'Top-right Toast',
                message: 'This toast is positioned at the top-right corner of the screen',
                position: 'top-right'
            });
        }

        function showRightToast() {
            toast.show({
                title: 'Right Toast',
                message: 'This toast is positioned at the right of the screen',
                position: 'right'
            });
        }

        function showBottomRightToast() {
            toast.show({
                title: 'Bottom-right Toast',
                message: 'This toast is positioned at the bottom-right corner of the screen',
                position: 'bottom-right'
            });
        }

        function showBottomToast() {
            toast.show({
                title: 'Bottom Toast',
                message: 'This toast is positioned at the bottom of the screen',
                position: 'bottom'
            });
        }

        function showBottomLeftToast() {
            toast.show({
                title: 'Bottom-left Toast',
                message: 'This toast is positioned at the bottom-left corner of the screen',
                position: 'bottom-left'
            });
        }

        function showLeftToast() {
            toast.show({
                title: 'Left Toast',
                message: 'This toast is positioned at the left of the screen',
                position: 'left'
            });
        }

        return {
            showTopLeftToast,
            showTopToast,
            showTopRightToast,
            showRightToast,
            showBottomRightToast,
            showBottomToast,
            showBottomLeftToast,
            showLeftToast
        };
    }
});
</script>
<template>
    <IButton @click="showTopLeftToast">Show top-left toast</IButton>
    <IButton @click="showTopToast">Show top toast</IButton>
    <IButton @click="showTopRightToast">Show top-right toast</IButton>
    <IButton @click="showRightToast">Show right toast</IButton>
    <IButton @click="showBottomRightToast">Show bottom-right toast</IButton>
    <IButton @click="showBottomToast">Show bottom toast</IButton>
    <IButton @click="showBottomLeftToast">Show bottom-left toast</IButton>
    <IButton @click="showLeftToast">Show left toast</IButton>
</template>
