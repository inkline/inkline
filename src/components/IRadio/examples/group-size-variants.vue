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
    <IRadioGroup v-model="checked" size="sm">
        <IRadio value="apple">Apple</IRadio>
        <IRadio value="banana">Banana</IRadio>
        <IRadio value="strawberry">Strawberry</IRadio>
        <IRadio value="mango">Mango</IRadio>
    </IRadioGroup>

    <IRadioGroup v-model="checked" size="md">
        <IRadio value="apple">Apple</IRadio>
        <IRadio value="banana">Banana</IRadio>
        <IRadio value="strawberry">Strawberry</IRadio>
        <IRadio value="mango">Mango</IRadio>
    </IRadioGroup>

    <IRadioGroup v-model="checked" size="lg">
        <IRadio value="apple">Apple</IRadio>
        <IRadio value="banana">Banana</IRadio>
        <IRadio value="strawberry">Strawberry</IRadio>
        <IRadio value="mango">Mango</IRadio>
    </IRadioGroup>
</template>
