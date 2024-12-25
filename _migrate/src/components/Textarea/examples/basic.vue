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
    <Textarea v-model="value" placeholder="Type something.." />
</template>
