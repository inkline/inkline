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
    <i-number-input v-model="value" placeholder="Enter a number..">
        <template #prefix>@</template>
    </i-number-input>
    
    <i-number-input v-model="value" placeholder="Enter a number..">
        <template #suffix>@</template>
    </i-number-input>
    
    <i-number-input v-model="value" placeholder="Enter a number..">
        <template #prefix>@</template>
        <template #suffix>@</template>
    </i-number-input>
</template>
