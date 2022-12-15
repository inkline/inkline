<script lang="ts" setup>
import { useForm } from '@inkline/inkline/composables';

const form = useForm({
    username: {},
    password: {}
});
</script>
<template>
    <i-form v-model="form">
        <i-form-group>
            <i-form-label>Username</i-form-label>
            <i-input name="username" placeholder="Enter a username.." />
        </i-form-group>
        <i-form-group>
            <i-form-label>Password</i-form-label>
            <i-input name="password" type="password" placeholder="Enter a password.." />
        </i-form-group>
    </i-form>

    <pre class="_margin-top:2 _text:muted">
    {{ form }}
    </pre>
</template>
