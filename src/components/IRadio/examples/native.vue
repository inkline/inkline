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
        <IRadio value="apple" native>Apple</IRadio>
        <IRadio value="banana" native>Banana</IRadio>
        <IRadio value="strawberry" native>Strawberry</IRadio>
        <IRadio value="mango" native>Mango</IRadio>
    </IRadioGroup>
</template>
