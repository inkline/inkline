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
    <IFormGroup required>
        <IFormLabel>Input Label Required</IFormLabel>
        <IInput v-model="value" placeholder="Type something.." />
    </IFormGroup>
</template>
