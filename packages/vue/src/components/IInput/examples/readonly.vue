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
    <IInput v-model="value" readonly placeholder="Type something.." />
</template>
