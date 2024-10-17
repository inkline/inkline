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
    <Input v-model="value" placeholder="Type something..">
        <template #prepend>
            <Button>Button</Button>
        </template>
    </Input>

    <Input v-model="value" placeholder="Type something..">
        <template #append>
            <Button>Button</Button>
        </template>
    </Input>

    <Input v-model="value" placeholder="Type something..">
        <template #prepend>
            <Button>Button</Button>
        </template>
        <template #append>
            <Button>Button</Button>
        </template>
    </Input>
</template>
