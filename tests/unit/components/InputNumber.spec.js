import { shallowMount } from '@vue/test-utils';
import InputNumber from '@inkline/inkline/src/components/InputNumber';

describe('Components', () => {
    describe('InputNumber', () => {
        let wrapper;

        beforeEach(() => {
            wrapper = shallowMount(InputNumber);
        });

        it('should be named correctly', () => {
            expect(InputNumber.name).toEqual('IInputNumber');
        });

        it('should render correctly', () => {
            expect(wrapper.html()).toMatchSnapshot();
        });

        describe('props', () => {
            describe('value', () => {
                it('should be defined', () => {
                    expect(wrapper.vm.value).toBeDefined();
                    expect(wrapper.vm.value).toEqual(0);
                });
            });

            describe('min', () => {
                it('should be defined', () => {
                    expect(wrapper.vm.min).toBeDefined();
                    expect(wrapper.vm.min).toEqual(-Infinity);
                });
            });

            describe('max', () => {
                it('should be defined', () => {
                    expect(wrapper.vm.max).toBeDefined();
                    expect(wrapper.vm.max).toEqual(Infinity);
                });
            });

            describe('precision', () => {
                it('should be defined', () => {
                    expect(wrapper.vm.precision).toBeDefined();
                    expect(wrapper.vm.precision).toEqual(0);
                });
            });

            describe('step', () => {
                it('should be defined', () => {
                    expect(wrapper.vm.step).toBeDefined();
                    expect(wrapper.vm.step).toEqual(1);
                });
            });
        });

        describe('methods', () => {
            describe('decrease()', () => {
                it('should be defined', () => {
                    expect(wrapper.vm.decrease).toBeDefined();
                });

                it('should emit input with decreased value, converted to string', () => {
                    wrapper.vm.decrease();

                    expect(wrapper.emitted().input[1]).toEqual(['-1']);
                });

                it('should emit input with decreased value and formatted precision, converted to string', () => {
                    wrapper.setProps({ precision: 2 });
                    wrapper.vm.decrease();

                    expect(wrapper.emitted().input[1]).toEqual(['-1.00']);
                });

                it('should emit input with value decreased by step and formatted precision, converted to string', () => {
                    wrapper.setProps({ precision: 2, step: 10 });
                    wrapper.vm.decrease();

                    expect(wrapper.emitted().input[1]).toEqual(['-10.00']);
                });
            });

            describe('increase()', () => {
                it('should be defined', () => {
                    expect(wrapper.vm.increase).toBeDefined();
                });

                it('should emit input with increased value, converted to string', () => {
                    wrapper.vm.increase();

                    expect(wrapper.emitted().input[1]).toEqual(['1']);
                });

                it('should emit input with increased value and formatted precision, converted to string', () => {
                    wrapper.setProps({ precision: 2 });
                    wrapper.vm.increase();

                    expect(wrapper.emitted().input[1]).toEqual(['1.00']);
                });

                it('should emit input with value increased by step and formatted precision, converted to string', () => {
                    wrapper.setProps({ precision: 2, step: 10 });
                    wrapper.vm.increase();

                    expect(wrapper.emitted().input[1]).toEqual(['10.00']);
                });
            });

            describe('formatPrecision()', () => {
                it('should be defined', () => {
                    expect(wrapper.vm.formatPrecision).toBeDefined();
                });

                it('should return integer if precision is 0', () => {
                    wrapper.setProps({ precision: 0 });

                    expect(wrapper.vm.formatPrecision('10')).toEqual('10');
                });

                it('should return floating point with given precision', () => {
                    wrapper.setProps({ precision: 2 });

                    expect(wrapper.vm.formatPrecision('10.95')).toEqual('10.95');
                });

                it('should return floating point with given precision and trailing zeroes', () => {
                    wrapper.setProps({ precision: 4 });

                    expect(wrapper.vm.formatPrecision('10.95')).toEqual('10.9500');
                });
            });

            describe('onBlurFormatPrecision()', () => {
                beforeEach(() => {
                    wrapper.setProps({ value: 0 });
                });

                it('should be defined', () => {
                    expect(wrapper.vm.onBlurFormatPrecision).toBeDefined();
                });

                it('should format precision for current value', () => {
                    wrapper.vm.onBlurFormatPrecision();

                    expect(wrapper.emitted().input[1]).toEqual(['0']);
                });

                it('should emit blur event', () => {
                    const e = {};

                    wrapper.vm.onBlurFormatPrecision(e);

                    expect(wrapper.emitted().blur[0]).toEqual([e]);
                });
            });
        });

        describe('watch', () => {
            describe('value()', () => {
                it('should not allow a value that doesn\'t have a floating point format', (done) => {
                    const spy = jest.spyOn(wrapper.vm, '$emit');

                    wrapper.setProps({ value: 'a' });

                    wrapper.vm.$nextTick(() => {
                        expect(spy).toHaveBeenLastCalledWith('input', '');
                        done();
                    });
                });

                it('should not allow dot if precision is 0', (done) => {
                    const spy = jest.spyOn(wrapper.vm, '$emit');

                    wrapper.setProps({ precision: 0, value: '10.' });

                    wrapper.vm.$nextTick(() => {
                        expect(spy).toHaveBeenLastCalledWith('input', '10');
                        done();
                    });
                });

                it('should allow dot if precision is greater than 0', (done) => {
                    const spy = jest.spyOn(wrapper.vm, '$emit');

                    wrapper.setProps({ precision: 2, value: '10.' });

                    wrapper.vm.$nextTick(() => {
                        expect(spy).toHaveBeenLastCalledWith('input', '10.');
                        done();
                    });
                });

                it('should allow decimals if precision is greater than 0', (done) => {
                    const spy = jest.spyOn(wrapper.vm, '$emit');

                    wrapper.setProps({ precision: 2, value: '10.1' });

                    wrapper.vm.$nextTick(() => {
                        expect(spy).toHaveBeenLastCalledWith('input', '10.1');
                        done();
                    });
                });

                it('should set value to min if input is less than min', (done) => {
                    const spy = jest.spyOn(wrapper.vm, '$emit');

                    wrapper.setProps({ min: '10', value: '8' });

                    wrapper.vm.$nextTick(() => {
                        expect(spy).toHaveBeenLastCalledWith('input', '10');
                        done();
                    });
                });

                it('should set value to max if input is greater than max', (done) => {
                    const spy = jest.spyOn(wrapper.vm, '$emit');

                    wrapper.setProps({ max: '10', value: '11' });

                    wrapper.vm.$nextTick(() => {
                        expect(spy).toHaveBeenLastCalledWith('input', '10');
                        done();
                    });
                });
            });
        });
    });
});
