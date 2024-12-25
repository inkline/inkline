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
        <FormGroup size="sm">
            <FormLabel>Input</FormLabel>
            <Input v-model="input" placeholder="Type something.." />
        </FormGroup>

        <FormGroup size="sm">
            <FormLabel>Textarea</FormLabel>
            <Textarea v-model="textarea" placeholder="Write a comment.." />
        </FormGroup>
    </Form>
</template>
