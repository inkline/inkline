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
        <IFormGroup disabled>
            <IFormLabel>Input</IFormLabel>
            <IInput v-model="input" placeholder="Type something.." />
        </IFormGroup>

        <IFormGroup disabled>
            <IFormLabel>Textarea</IFormLabel>
            <ITextarea v-model="textarea" placeholder="Write a comment.." />
        </IFormGroup>
    </IForm>
</template>
