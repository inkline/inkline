<script>
export default {
    data() {
        return {
            schema: this.$inkline.form({
                group1: {
                    input1: {
                        value: 'G1 example 1',
                        validators: [{ name: 'required' }]
                    }
                },
                group2: {
                    input1: {
                        value: 'alex@grozav.com',
                        validators: [{ name: 'required' }, { name: 'email' }]
                    },
                    group1: {
                        input1: {
                            value: 'G2 G1',
                            validators: ['required', { name: 'maxLength', value: 5 }]
                        }
                    }
                },
                group3: [
                    {
                        value: 'G3 example 0'
                    },
                    {
                        value: 'G3 example 1'
                    }
                ],
                form4: {
                    group1: {
                        input1: {
                            value: 'F4 G1 example 3'
                        }
                    }
                },
                group5: {
                    input1: {
                        value: 'G5 example 1'
                    },
                    group1: {
                        input1: {
                            value: 'G5 G1 example 3'
                        }
                    }
                }
            })
        };
    },
    methods: {
        onSubmit() {
            alert('Submitted!');
        },
        addRow() {
            this.schema.group3.push(
                this.$inkline.form({
                    value: `G3 example ${this.schema.group3.length}`
                })
            );
        },
        setRow() {
            this.schema.group5.example = this.$inkline.form({});
        }
    }
};
</script>
<template>
    <i-form v-model="schema" @submit="onSubmit">
        <i-form-group name="group1">
            <i-form-label for="input1">Input 1</i-form-label>
            <i-input id="input1" name="input1" placeholder="Type something.." />
        </i-form-group>

        <i-form-group name="group2">
            <i-form-label>Input 2</i-form-label>
            <i-input name="input1" placeholder="Type something.." />

            <i-form-group name="group1">
                <i-form-label>Input 3</i-form-label>
                <i-input name="input1" placeholder="Type something.." />
            </i-form-group>
        </i-form-group>

        <i-form-group name="group3">
            <i-form-group v-for="(input, index) in schema.group3" :key="index">
                <i-form-label>Input {{ index }}</i-form-label>
                <i-input :name="index" placeholder="Type something.." />
            </i-form-group>

            <i-button type="button" @click="addRow">Add Row</i-button>
        </i-form-group>

        <i-form name="form4">
            <i-form-group name="group1">
                <i-form-label>Input</i-form-label>
                <i-input name="input1" placeholder="Type something.." />
            </i-form-group>
        </i-form>

        <i-form-group>
            <i-form-label>Input 1</i-form-label>
            <i-input name="group5.input1" placeholder="Type something.." />

            <div v-if="schema.group5.example">
                <i-form-label>Input 2</i-form-label>
                <i-input name="group5.example" placeholder="Type something.." />
            </div>

            <i-form-group name="group5.group1">
                <i-form-label>Input 3</i-form-label>
                <i-input name="input1" placeholder="Type something.." />
            </i-form-group>
        </i-form-group>

        <i-form-group>
            <i-button type="submit">Submit</i-button>
            <i-button type="button" class="_margin-left" @click="setRow">Set Row</i-button>
        </i-form-group>
    </i-form>
</template>
