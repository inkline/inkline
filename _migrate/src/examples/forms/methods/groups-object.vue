<script lang="ts" setup>
import { computed } from 'vue';
import { useForm } from '@inkline/validation';
import { createFormFieldSchema } from '@inkline/validation';

const { schema } = useForm<{
    group: {
        firstName: string;
        lastName: string;
        email?: string;
        address?: string;
    };
}>({
    group: {
        firstName: {
            validators: [{ name: 'required' }]
        },
        lastName: {
            validators: ['required']
        }
    }
});

const prettySchema = computed(() => {
    return JSON.stringify(schema.value, null, 4);
});

function setEmail() {
    schema.value.group.email = createFormFieldSchema({
        validators: [{ name: 'email' }]
    });
}

function setAddress() {
    schema.value.group.address = createFormFieldSchema({
        value: '32 Inkline St.'
    });
}
</script>
<template>
    <Form v-model="schema">
        <FormGroup name="group">
            <FormGroup>
                <FormLabel>First name</FormLabel>
                <Input name="group.firstName" placeholder="Type something.." />
                <FormError for="group.firstName" />
            </FormGroup>
            <FormGroup>
                <FormLabel>Last name</FormLabel>
                <Input name="group.lastName" placeholder="Type something.." />
                <FormError for="group.lastName" />
            </FormGroup>
            <FormGroup v-if="schema.group.email">
                <FormLabel>Email</FormLabel>
                <Input name="group.email" placeholder="Type something.." />
                <FormError for="group.email" />
            </FormGroup>
            <FormGroup v-if="schema.group.address">
                <FormLabel>Address</FormLabel>
                <Input name="group.address" placeholder="Type something.." />
                <FormError for="group.address" />
            </FormGroup>
        </FormGroup>
        <FormGroup>
            <Button type="button" @click="setEmail"> Set Email </Button>&nbsp;
            <Button type="button" @click="setAddress"> Set Address </Button>&nbsp;
        </FormGroup>
    </Form>

    <pre class="_margin-top:1">{{ prettySchema }}</pre>
</template>
