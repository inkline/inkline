<script>
export default {
    data() {
        return {
            checked: true
        };
    }
};
</script>
<template>
    <i-radio-group v-model="checked">
        <i-radio value="apple" readonly>Apple</i-radio>
    </i-radio-group>
</template>
