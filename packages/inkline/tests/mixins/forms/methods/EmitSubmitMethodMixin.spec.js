import { mount } from '@vue/test-utils'

import EmitSubmitMethodMixin from '@inkline/inkline/src/mixins/methods/EmitSubmitMethodMixin';

describe('Mixins', () => {
    describe('EmitSubmitMethodMixin', () => {
        let wrapper;
        let schemaWrapper;

        beforeEach(() => {
            const schema = {
                validate() {},
                input: {
                    validators: [
                        { rule: 'required' }
                    ]
                }
            };

            wrapper = mount({
                render() {},
                mixins: [ EmitSubmitMethodMixin ]
            });

            schemaWrapper = mount({
                render() {},
                data() {
                    return {
                        schema,
                        validationOptions: {
                            getSchema: () => schema
                        }
                    };
                },
                mixins: [ EmitSubmitMethodMixin ]
            });
        });

        describe('methods', () => {
            describe('emitSubmit()', () => {
                it('should be defined', () => {
                    expect(wrapper.vm.emitSubmit).toBeDefined();
                });

                it('should emit "submit" event', () => {
                    const event = { preventDefault() {} };

                    wrapper.vm.emitSubmit(event);

                    expect(wrapper.emitted().submit).toBeTruthy();
                    expect(wrapper.emitted().submit.length).toBe(1);
                    expect(wrapper.emitted().submit[0]).toEqual([event]);
                });

                it('should validate schema', () => {
                    const spy = jest.spyOn(schemaWrapper.vm.schema, 'validate');
                    const event = { preventDefault() {} };

                    schemaWrapper.vm.emitSubmit(event);

                    expect(spy).toHaveBeenCalled();
                });

                it('should return if schema is invalid', () => {
                    const spy = jest.spyOn(schemaWrapper.vm.schema, 'validate');
                    const event = { preventDefault() {} };

                    schemaWrapper.vm.schema.invalid = true;
                    schemaWrapper.vm.emitSubmit(event);

                    expect(spy).toHaveBeenCalled();
                    expect(schemaWrapper.emitted().submit).not.toBeTruthy();
                });

                it('should emit "submit" if schema is valid', () => {
                    const spy = jest.spyOn(schemaWrapper.vm.schema, 'validate');
                    const event = { preventDefault() {} };

                    schemaWrapper.vm.schema.input.value = 'value';
                    schemaWrapper.vm.emitSubmit(event);

                    expect(spy).toHaveBeenCalled();
                    expect(schemaWrapper.emitted().submit).toBeTruthy();
                });
            });
        });
    });
});
