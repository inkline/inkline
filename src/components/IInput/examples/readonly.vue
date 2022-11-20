<script>
export default {
    data() {
        return {
            value: 'This input is readonly.'
        };
    }
};
</script>
<template>
    <i-input v-model="value" readonly placeholder="Type something.." />
</template>
