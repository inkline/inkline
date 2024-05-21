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
</template>
