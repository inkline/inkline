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
    <Textarea v-model="value" placeholder="Type something..">
        <template #prepend>
            <span>https://</span>
        </template>
    </Textarea>

    <Textarea v-model="value" placeholder="Type something..">
        <template #append>
            <span>.com</span>
        </template>
    </Textarea>

    <Textarea v-model="value" placeholder="Type something..">
        <template #prepend>
            <span>https://</span>
        </template>
        <template #append>
            <span>.com</span>
        </template>
    </Textarea>
</template>
