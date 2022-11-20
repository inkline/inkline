<script>
export default {
    data() {
        return {
            value: 'This input is clearable.'
        };
    }
};
</script>
<template>
    <i-textarea v-model="value" clearable placeholder="Type something.." />
</template>
