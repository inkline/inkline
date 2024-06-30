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
    <ITextarea v-model="value" readonly placeholder="Type something.." />
</template>
