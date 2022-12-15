<script lang="ts" setup>
import { useForm } from '@inkline/inkline/composables';
import { computed } from 'vue';

const schema = useForm({
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
    const { value: emailField } = useForm({
        validators: [{ name: 'email' }]
    });

    schema.value.group.email = emailField;
}

function setAddress() {
    const { value: addressField } = useForm({
        value: '32 Inkline St.'
    });

    schema.value.group.address = addressField;
}
</script>
<template>
    <i-form v-model="schema">
        <i-form-group name="group">
            <i-form-group>
                <i-form-label>First name</i-form-label>
                <i-input name="group.firstName" placeholder="Type something.." />
                <i-form-error for="group.firstName" />
            </i-form-group>
            <i-form-group>
                <i-form-label>Last name</i-form-label>
                <i-input name="group.lastName" placeholder="Type something.." />
                <i-form-error for="group.lastName" />
            </i-form-group>
            <i-form-group v-if="schema.group.email">
                <i-form-label>Email</i-form-label>
                <i-input name="group.email" placeholder="Type something.." />
                <i-form-error for="group.email" />
            </i-form-group>
            <i-form-group v-if="schema.group.address">
                <i-form-label>Address</i-form-label>
                <i-input name="group.address" placeholder="Type something.." />
                <i-form-error for="group.address" />
            </i-form-group>
        </i-form-group>
        <i-form-group>
            <i-button type="button" @click="setEmail"> Set Email </i-button>&nbsp;
            <i-button type="button" @click="setAddress"> Set Address </i-button>&nbsp;
        </i-form-group>
    </i-form>

    <pre>{{ prettySchema }}</pre>
</template>
