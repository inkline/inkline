<script lang="ts" setup>
import { useForm } from '@inkline/inkline/composables';

const form = useForm({
    username: {},
    password: {}
});
</script>
<template>
    <IForm v-model="form">
        <IFormGroup>
            <IFormLabel>Username</IFormLabel>
            <IInput name="username" placeholder="Enter a username.." />
        </IFormGroup>
        <IFormGroup>
            <IFormLabel>Password</IFormLabel>
            <IInput name="password" type="password" placeholder="Enter a password.." />
        </IFormGroup>
    </IForm>

    <pre class="_margin-top:2 _text:muted">{{ form }}</pre>
</template>
