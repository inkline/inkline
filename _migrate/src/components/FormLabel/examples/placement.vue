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

    <FormGroup inline>
        <FormLabel placement="left">Input Label Left</FormLabel>
        <Input v-model="value" placeholder="Type something.." />
    </FormGroup>

    <FormGroup inline>
        <FormLabel placement="right">Input Label Right</FormLabel>
        <Input v-model="value" placeholder="Type something.." />
    </FormGroup>
</template>
