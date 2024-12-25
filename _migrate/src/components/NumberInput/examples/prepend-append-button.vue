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
            <Button>Button</Button>
        </template>
    </NumberInput>

    <NumberInput v-model="value" placeholder="Enter a number..">
        <template #append>
            <Button>Button</Button>
        </template>
    </NumberInput>

    <NumberInput v-model="value" placeholder="Enter a number..">
        <template #prepend>
            <Button>Button</Button>
        </template>
        <template #append>
            <Button>Button</Button>
        </template>
    </NumberInput>
</template>
