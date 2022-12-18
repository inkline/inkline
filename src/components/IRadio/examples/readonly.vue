<script>
export default {
    data() {
        return {
            checked: 'apple'
        };
    }
};
</script>
<template>
    <IRadioGroup v-model="checked">
        <IRadio value="apple" readonly>Apple</IRadio>
        <IRadio value="banana" readonly>Banana</IRadio>
    </IRadioGroup>
</template>
