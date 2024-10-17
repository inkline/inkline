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
        <template #prepend>
            <span>https://</span>
        </template>
    </NumberInput>

    <NumberInput v-model="value" placeholder="Enter a number..">
        <template #append>
            <span>.com</span>
        </template>
    </NumberInput>

    <NumberInput v-model="value" placeholder="Enter a number..">
        <template #prepend>
            <span>https://</span>
        </template>
        <template #append>
            <span>.com</span>
        </template>
    </NumberInput>
</template>
