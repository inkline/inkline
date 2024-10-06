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
    <IInput v-model="value" type="text" placeholder="Enter some text.." />

    <IInput v-model="value" type="password" placeholder="Enter a password.." />

    <IInput v-model="value" type="date" placeholder="Enter a date.." />

    <IInput v-model="value" type="email" placeholder="Enter an email.." />

    <IInput v-model="value" type="number" placeholder="Enter a number.." />
</template>
