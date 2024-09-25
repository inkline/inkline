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
    <IInput v-model="value" placeholder="Type something..">
        <template #prefix>@</template>
    </IInput>

    <IInput v-model="value" placeholder="Type something..">
        <template #suffix>@</template>
    </IInput>

    <IInput v-model="value" placeholder="Type something..">
        <template #prefix>@</template>
        <template #suffix>@</template>
    </IInput>
</template>
