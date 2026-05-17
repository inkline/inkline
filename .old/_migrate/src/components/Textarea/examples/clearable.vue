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
    <Textarea v-model="value" clearable placeholder="Type something.." />
</template>
