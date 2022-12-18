<script>
export default {
    data() {
        return {
            checked: ''
        };
    }
};
</script>
<template>
    <IRadioGroup v-model="checked">
        <IRadio value="small" size="sm">Small</IRadio>
        <IRadio value="medium" size="md">Medium</IRadio>
        <IRadio value="large" size="lg">Large</IRadio>
    </IRadioGroup>
</template>
