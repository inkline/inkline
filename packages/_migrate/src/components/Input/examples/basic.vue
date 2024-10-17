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
    <Input id="test" v-model="value" placeholder="Type something.." />
</template>
