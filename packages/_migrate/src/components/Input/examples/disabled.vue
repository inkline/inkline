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
    <Input v-model="value" disabled placeholder="Type something.." />
</template>
