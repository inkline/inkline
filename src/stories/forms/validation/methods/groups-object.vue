<script lang="ts" setup>
import { computed } from 'vue';
import { createFormFieldSchema, useForm } from '@inkline/inkline';

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
    <IForm v-model="schema">
        <IFormGroup name="group">
            <IFormGroup>
                <IFormLabel>First name</IFormLabel>
                <IInput name="group.firstName" placeholder="Type something.." />
                <IFormError for="group.firstName" />
            </IFormGroup>
            <IFormGroup>
                <IFormLabel>Last name</IFormLabel>
                <IInput name="group.lastName" placeholder="Type something.." />
                <IFormError for="group.lastName" />
            </IFormGroup>
            <IFormGroup v-if="schema.group.email">
                <IFormLabel>Email</IFormLabel>
                <IInput name="group.email" placeholder="Type something.." />
                <IFormError for="group.email" />
            </IFormGroup>
            <IFormGroup v-if="schema.group.address">
                <IFormLabel>Address</IFormLabel>
                <IInput name="group.address" placeholder="Type something.." />
                <IFormError for="group.address" />
            </IFormGroup>
        </IFormGroup>
        <IFormGroup>
            <IButton type="button" @click="setEmail"> Set Email </IButton>&nbsp;
            <IButton type="button" @click="setAddress"> Set Address </IButton>&nbsp;
        </IFormGroup>
    </IForm>

    <pre class="_margin-top:1">{{ prettySchema }}</pre>
</template>
