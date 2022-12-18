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
    <IForm v-model="schema" @submit="onSubmit">
        <IFormGroup name="group1">
            <IFormLabel for="input1">Input 1</IFormLabel>
            <IInput id="input1" name="input1" placeholder="Type something.." />
        </IFormGroup>

        <IFormGroup name="group2">
            <IFormLabel>Input 2</IFormLabel>
            <IInput name="input1" placeholder="Type something.." />

            <IFormGroup name="group1">
                <IFormLabel>Input 3</IFormLabel>
                <IInput name="input1" placeholder="Type something.." />
            </IFormGroup>
        </IFormGroup>

        <IFormGroup name="group3">
            <IFormGroup v-for="(input, index) in schema.group3" :key="index">
                <IFormLabel>Input {{ index }}</IFormLabel>
                <IInput :name="index" placeholder="Type something.." />
            </IFormGroup>

            <IButton type="button" @click="addRow">Add Row</IButton>
        </IFormGroup>

        <IForm name="form4">
            <IFormGroup name="group1">
                <IFormLabel>Input</IFormLabel>
                <IInput name="input1" placeholder="Type something.." />
            </IFormGroup>
        </IForm>

        <IFormGroup>
            <IFormLabel>Input 1</IFormLabel>
            <IInput name="group5.input1" placeholder="Type something.." />

            <div v-if="schema.group5.example">
                <IFormLabel>Input 2</IFormLabel>
                <IInput name="group5.example" placeholder="Type something.." />
            </div>

            <IFormGroup name="group5.group1">
                <IFormLabel>Input 3</IFormLabel>
                <IInput name="input1" placeholder="Type something.." />
            </IFormGroup>
        </IFormGroup>

        <IFormGroup>
            <IButton type="submit">Submit</IButton>
            <IButton type="button" class="_margin-left" @click="setRow">Set Row</IButton>
        </IFormGroup>
    </IForm>
</template>
