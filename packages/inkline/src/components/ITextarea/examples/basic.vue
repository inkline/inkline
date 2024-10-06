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
    <ITextarea v-model="value" placeholder="Type something.." />
</template>
