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
    <FormGroup>
        <FormLabel>Input Label Default</FormLabel>
        <Input v-model="value" placeholder="Type something.." />
    </FormGroup>
</template>
