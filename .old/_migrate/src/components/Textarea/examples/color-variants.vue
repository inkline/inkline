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
    <Textarea v-model="value" color="light" placeholder="Type something.." />

    <Textarea v-model="value" color="dark" placeholder="Type something.." />
</template>
