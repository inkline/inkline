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
    <Form>
        <FormGroup size="lg">
            <FormLabel>Input</FormLabel>
            <Input v-model="input" placeholder="Type something.." />
        </FormGroup>

        <FormGroup size="lg">
            <FormLabel>Textarea</FormLabel>
            <Textarea v-model="textarea" placeholder="Write a comment.." />
        </FormGroup>
    </Form>
</template>
