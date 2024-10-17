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
    <Textarea v-model="value" readonly placeholder="Type something.." />
</template>
