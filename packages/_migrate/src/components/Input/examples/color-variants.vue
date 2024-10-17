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
    <Input v-model="value" color="light" placeholder="Type something.." />

    <Input v-model="value" color="dark" placeholder="Type something.." />
</template>
