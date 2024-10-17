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
    <FormGroup>
        <FormLabel size="sm">Input</FormLabel>
        <Input v-model="input" placeholder="Type something.." />
    </FormGroup>

    <FormGroup>
        <FormLabel size="md">Input</FormLabel>
        <Input v-model="input" placeholder="Type something.." />
    </FormGroup>

    <FormGroup>
        <FormLabel size="lg">Input</FormLabel>
        <Input v-model="input" placeholder="Type something.." />
    </FormGroup>
</template>
