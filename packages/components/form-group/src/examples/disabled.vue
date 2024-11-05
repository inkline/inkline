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
        <FormGroup disabled>
            <FormLabel>Input</FormLabel>
            <Input v-model="input" placeholder="Type something.." />
        </FormGroup>

        <FormGroup disabled>
            <FormLabel>Textarea</FormLabel>
            <Textarea v-model="textarea" placeholder="Write a comment.." />
        </FormGroup>
    </Form>
</template>
