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
        <IRadio value="apple">Apple</IRadio>
        <IRadio value="banana">Banana</IRadio>
        <IRadio value="strawberry">Strawberry</IRadio>
        <IRadio value="mango">Mango</IRadio>
    </IRadioGroup>
</template>
