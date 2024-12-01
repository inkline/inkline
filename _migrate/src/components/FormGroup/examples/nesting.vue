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
    <Form>
        <FormGroup>
            <FormGroup>
                <FormLabel>Input</FormLabel>
                <Input v-model="input" placeholder="Type something.." />
            </FormGroup>

            <FormGroup>
                <FormLabel>Textarea</FormLabel>
                <Textarea v-model="textarea" placeholder="Write a comment.." />
            </FormGroup>
        </FormGroup>

        <FormGroup>
            <Checkbox v-model="checkbox">I accept the terms and conditions</Checkbox>
        </FormGroup>
    </Form>
</template>
