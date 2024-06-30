<script>
export default {
    data() {
        return {
            value: ''
        };
    }
};
</script>
<template>
    <IFormGroup>
        <IFormLabel>Input Label Default</IFormLabel>
        <IInput v-model="value" placeholder="Type something.." />
    </IFormGroup>

    <IFormGroup inline>
        <IFormLabel placement="left">Input Label Left</IFormLabel>
        <IInput v-model="value" placeholder="Type something.." />
    </IFormGroup>

    <IFormGroup inline>
        <IFormLabel placement="right">Input Label Right</IFormLabel>
        <IInput v-model="value" placeholder="Type something.." />
    </IFormGroup>
</template>
