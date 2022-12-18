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
    <ITextarea v-model="value" placeholder="Type something..">
        <template #prefix>@</template>
    </ITextarea>

    <ITextarea v-model="value" placeholder="Type something..">
        <template #suffix>@</template>
    </ITextarea>

    <ITextarea v-model="value" placeholder="Type something..">
        <template #prefix>@</template>
        <template #suffix>@</template>
    </ITextarea>
</template>
