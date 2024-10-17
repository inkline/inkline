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
        <template #prefix>@</template>
    </Textarea>

    <Textarea v-model="value" placeholder="Type something..">
        <template #suffix>@</template>
    </Textarea>

    <Textarea v-model="value" placeholder="Type something..">
        <template #prefix>@</template>
        <template #suffix>@</template>
    </Textarea>
</template>
