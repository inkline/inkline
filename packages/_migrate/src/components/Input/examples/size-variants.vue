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
    <Input v-model="value" size="sm" placeholder="Type something.." />

    <Input v-model="value" size="md" placeholder="Type something.." />

    <Input v-model="value" size="lg" placeholder="Type something.." />
</template>
