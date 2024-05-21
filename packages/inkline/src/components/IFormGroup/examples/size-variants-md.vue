<script>
export default {
    data() {
        return {
            input: '',
            textarea: ''
        };
    }
};
</script>
<template>
    <IForm>
        <IFormGroup size="md">
            <IFormLabel>Input</IFormLabel>
            <IInput v-model="input" placeholder="Type something.." />
        </IFormGroup>

        <IFormGroup size="md">
            <IFormLabel>Textarea</IFormLabel>
            <ITextarea v-model="textarea" placeholder="Write a comment.." />
        </IFormGroup>
    </IForm>
</template>
