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
    <IInput v-model="value" clearable placeholder="Type something.." />
</template>
