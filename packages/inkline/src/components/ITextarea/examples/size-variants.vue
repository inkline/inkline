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
    <ITextarea v-model="value" size="sm" placeholder="Type something.." />

    <ITextarea v-model="value" size="md" placeholder="Type something.." />

    <ITextarea v-model="value" size="lg" placeholder="Type something.." />
</template>
