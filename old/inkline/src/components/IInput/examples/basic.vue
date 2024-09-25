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
    <IInput id="test" v-model="value" placeholder="Type something.." />
</template>
