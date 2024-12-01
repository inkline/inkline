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
    <FormGroup required>
        <FormLabel>Input Label Required</FormLabel>
        <Input v-model="value" placeholder="Type something.." />
    </FormGroup>
</template>
