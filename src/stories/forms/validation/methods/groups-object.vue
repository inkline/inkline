<script>
export default {
    data() {
        return {
            schema: this.$inkline.form({
                group: {
                    firstName: {
                        validators: [{ name: 'required' }]
                    },
                    lastName: {
                        validators: ['required']
                    }
                }
            })
        };
    },
    methods: {
        setEmail() {
            this.schema.group.email = this.$inkline.form({
                validators: [{ name: 'email' }]
            });
        },
        setAddress() {
            this.schema.group.address = this.$inkline.form({
                value: '32 Inkline St.'
            });
        }
    }
};
</script>
<template>
    <i-form v-model="schema">
        <i-form-group name="group">
            <i-form-group>
                <i-form-label>First name</i-form-label>
                <i-input name="firstName" placeholder="Type something.." />
                <i-form-error for="firstName" />
            </i-form-group>
            <i-form-group>
                <i-form-label>Last name</i-form-label>
                <i-input name="lastName" placeholder="Type something.." />
                <i-form-error for="lastName" />
            </i-form-group>
            <i-form-group v-if="schema.group.email">
                <i-form-label>Email</i-form-label>
                <i-input name="email" placeholder="Type something.." />
                <i-form-error for="email" />
            </i-form-group>
            <i-form-group v-if="schema.group.address">
                <i-form-label>Address</i-form-label>
                <i-input name="address" placeholder="Type something.." />
                <i-form-error for="address" />
            </i-form-group>
        </i-form-group>
        <i-form-group>
            <i-button type="button" @click="setEmail">Set Email</i-button>&nbsp;
            <i-button type="button" @click="setAddress">Set Address</i-button>&nbsp;
        </i-form-group>
    </i-form>
</template>
