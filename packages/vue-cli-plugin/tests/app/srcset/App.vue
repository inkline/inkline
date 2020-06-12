<template>
    <i-container>
        <i-row>
            <i-column>
                <h1>Welcome to Inkline!</h1>
                <p>This is your starter page. Make sure to read the documentation to learn about what Inkline has to offer.</p>
                <i-button href="https://inkline.io/docs/introduction/getting-started">Read Documentation</i-button>
            </i-column>
        </i-row>
        <i-row>
            <i-column>
                <h1>Form</h1>
                <p>This is a simple Inkline forms test.</p>
                <i-form v-model="form">
                    <i-form-group>
                        <i-input :schema="form.input" placeholder="Type something.." />
                    </i-form-group>

                    <i-form-group>
                        <i-textarea :schema="form.textarea" placeholder="Write a comment.." />
                    </i-form-group>

                    <i-form-group>
                        <i-select :schema="form.select" placeholder="Choose an option">
                            <i-select-option value="a" label="Option A" />
                            <i-select-option value="b" label="Option B" />
                            <i-select-option value="c" label="Option C" disabled />
                        </i-select>
                    </i-form-group>

                    <i-form-group>
                        <i-checkbox-group :schema="form.checkbox">
                            <i-checkbox value="Football">Football</i-checkbox>
                            <i-checkbox value="Volleyball">Volleyball</i-checkbox>
                            <i-checkbox value="Tennis" disabled>Tennis</i-checkbox>
                        </i-checkbox-group>
                    </i-form-group>

                    <i-form-group>
                        <i-radio-group :schema="form.radio">
                            <i-radio value="Accept">Accept</i-radio>
                            <i-radio value="Decline">Decline</i-radio>
                        </i-radio-group>
                    </i-form-group>

                    <i-form-group>
                        <i-button type="submit">Submit</i-button>
                    </i-form-group>
                </i-form>
            </i-column>
        </i-row>
    </i-container>
</template>

<script>
    export default {
        name: 'App',
        data() {
            return {
                form: this.$inkline.form({
                    input: {
                        validators: [
                            { rule: 'required' }
                        ]
                    },
                    textarea: {},
                    select: {},
                    checkbox: {},
                    radio: {}
                })
            };
        }
    }
</script>
