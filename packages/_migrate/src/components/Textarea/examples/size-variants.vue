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
    <Textarea v-model="value" size="sm" placeholder="Type something.." />

    <Textarea v-model="value" size="md" placeholder="Type something.." />

    <Textarea v-model="value" size="lg" placeholder="Type something.." />
</template>
