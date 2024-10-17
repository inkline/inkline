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
    <Input v-model="value" clearable placeholder="Type something.." />
</template>
