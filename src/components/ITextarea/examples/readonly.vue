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
    <i-textarea v-model="value" readonly placeholder="Type something.." />
</template>
