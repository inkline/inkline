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
    <ITextarea v-model="value" color="light" placeholder="Type something.." />

    <ITextarea v-model="value" color="dark" placeholder="Type something.." />
</template>
