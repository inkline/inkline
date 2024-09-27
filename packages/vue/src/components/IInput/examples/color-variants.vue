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
    <IInput v-model="value" color="light" placeholder="Type something.." />

    <IInput v-model="value" color="dark" placeholder="Type something.." />
</template>
