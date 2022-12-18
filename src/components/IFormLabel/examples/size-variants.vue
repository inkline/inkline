<script>
export default {
    data() {
        return {
            input: ''
        };
    }
};
</script>
<template>
    <IFormGroup>
        <IFormLabel size="sm">Input</IFormLabel>
        <IInput v-model="input" placeholder="Type something.." />
    </IFormGroup>

    <IFormGroup>
        <IFormLabel size="md">Input</IFormLabel>
        <IInput v-model="input" placeholder="Type something.." />
    </IFormGroup>

    <IFormGroup>
        <IFormLabel size="lg">Input</IFormLabel>
        <IInput v-model="input" placeholder="Type something.." />
    </IFormGroup>
</template>
