<script lang="ts">
export default {
    data() {
        return {
            input: '',
            textarea: '',
            select: null,
            options: [
                { id: 1, label: 'Option A' },
                { id: 2, label: 'Option B' },
                { id: 3, label: 'Option C' }
            ],
            checkboxGroup: ['apple'],
            radioGroup: 'coconut',
            checkbox: true,
            toggle: true,
            loading: false
        };
    },
    methods: {
        onSubmit() {
            this.loading = true;

            setTimeout(() => {
                this.loading = false;
            }, 2000);
        }
    }
};
</script>

<template>
    <Form size="md" @submit="onSubmit">
        <FormGroup>
            <FormLabel>Input</FormLabel>
            <Input v-model="input" placeholder="Type something.." />
        </FormGroup>

        <FormGroup>
            <FormLabel>Textarea</FormLabel>
            <Textarea v-model="textarea" placeholder="Write a comment.." />
        </FormGroup>

        <FormGroup>
            <FormLabel>Select</FormLabel>
            <Select v-model="select" :options="options" placeholder="Choose an option" />
        </FormGroup>

        <FormGroup>
            <FormLabel>Checkbox Group</FormLabel>
            <CheckboxGroup v-model="checkboxGroup">
                <Checkbox value="apple">Apple</Checkbox>
                <Checkbox value="banana">Banana</Checkbox>
                <Checkbox value="strawberry">Strawberry</Checkbox>
                <Checkbox value="mango">Mango</Checkbox>
            </CheckboxGroup>
        </FormGroup>

        <FormGroup>
            <FormLabel>Radio Group</FormLabel>
            <RadioGroup v-model="radioGroup">
                <Radio value="coconut">Coconut</Radio>
                <Radio value="passionfruit">Passion fruit</Radio>
                <Radio value="apricot">Apricot</Radio>
            </RadioGroup>
        </FormGroup>

        <FormGroup>
            <FormLabel>Toggle</FormLabel>
            <Toggle v-model="toggle">I confirm this toggle</Toggle>
        </FormGroup>

        <FormGroup>
            <FormLabel>Checkbox</FormLabel>
            <Checkbox v-model="checkbox">I accept the terms and conditions</Checkbox>
        </FormGroup>

        <FormGroup>
            <Button type="submit" :loading="loading"> Submit </Button>
        </FormGroup>
    </Form>
</template>
