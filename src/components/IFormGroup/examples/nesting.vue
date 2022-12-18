<script>
export default {
    data() {
        return {
            input: '',
            textarea: '',
            checkbox: false
        };
    }
};
</script>
<template>
    <IForm>
        <IFormGroup>
            <IFormGroup>
                <IFormLabel>Input</IFormLabel>
                <IInput v-model="input" placeholder="Type something.." />
            </IFormGroup>

            <IFormGroup>
                <IFormLabel>Textarea</IFormLabel>
                <ITextarea v-model="textarea" placeholder="Write a comment.." />
            </IFormGroup>
        </IFormGroup>

        <IFormGroup>
            <ICheckbox v-model="checkbox">I accept the terms and conditions</ICheckbox>
        </IFormGroup>
    </IForm>
</template>
