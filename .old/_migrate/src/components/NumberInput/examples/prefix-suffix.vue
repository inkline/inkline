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
    <NumberInput v-model="value" placeholder="Enter a number..">
        <template #prefix>@</template>
    </NumberInput>

    <NumberInput v-model="value" placeholder="Enter a number..">
        <template #suffix>@</template>
    </NumberInput>

    <NumberInput v-model="value" placeholder="Enter a number..">
        <template #prefix>@</template>
        <template #suffix>@</template>
    </NumberInput>
</template>
