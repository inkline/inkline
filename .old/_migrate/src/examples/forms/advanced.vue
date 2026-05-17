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
    <Form v-model="schema" @submit="onSubmit">
        <FormGroup name="group1">
            <FormLabel for="input1">Input 1</FormLabel>
            <Input id="input1" name="input1" placeholder="Type something.." />
        </FormGroup>

        <FormGroup name="group2">
            <FormLabel>Input 2</FormLabel>
            <Input name="input1" placeholder="Type something.." />

            <FormGroup name="group1">
                <FormLabel>Input 3</FormLabel>
                <Input name="input1" placeholder="Type something.." />
            </FormGroup>
        </FormGroup>

        <FormGroup name="group3">
            <FormGroup v-for="(input, index) in schema.group3" :key="index">
                <FormLabel>Input {{ index }}</FormLabel>
                <Input :name="index" placeholder="Type something.." />
            </FormGroup>

            <Button type="button" @click="addRow">Add Row</Button>
        </FormGroup>

        <Form name="form4">
            <FormGroup name="group1">
                <FormLabel>Input</FormLabel>
                <Input name="input1" placeholder="Type something.." />
            </FormGroup>
        </Form>

        <FormGroup>
            <FormLabel>Input 1</FormLabel>
            <Input name="group5.input1" placeholder="Type something.." />

            <div v-if="schema.group5.example">
                <FormLabel>Input 2</FormLabel>
                <Input name="group5.example" placeholder="Type something.." />
            </div>

            <FormGroup name="group5.group1">
                <FormLabel>Input 3</FormLabel>
                <Input name="input1" placeholder="Type something.." />
            </FormGroup>
        </FormGroup>

        <FormGroup>
            <Button type="submit">Submit</Button>
            <Button type="button" class="_margin-left" @click="setRow">Set Row</Button>
        </FormGroup>
    </Form>
</template>
