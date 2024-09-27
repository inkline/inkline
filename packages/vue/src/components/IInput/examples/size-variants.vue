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
    <IInput v-model="value" size="sm" placeholder="Type something.." />

    <IInput v-model="value" size="md" placeholder="Type something.." />

    <IInput v-model="value" size="lg" placeholder="Type something.." />
</template>
