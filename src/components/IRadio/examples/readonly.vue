<script>
export default {
    data() {
        return {
            checked: 'apple'
        };
    }
};
</script>
<template>
    <i-radio-group v-model="checked">
        <i-radio value="apple" readonly>Apple</i-radio>
        <i-radio value="banana" readonly>Banana</i-radio>
    </i-radio-group>
</template>
