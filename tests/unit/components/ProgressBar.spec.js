import { shallowMount } from '@vue/test-utils';
import ProgressBar from '@inkline/inkline/components/ProgressBar';

describe('Components', () => {
    describe('ProgressBar', () => {
        let wrapper;

        beforeEach(() => {
            wrapper = shallowMount(ProgressBar);
        });

        it('should be named correctly', () => {
            expect(ProgressBar.name).toEqual('IProgressBar');
        });

        it('should render correctly', () => {
            expect(wrapper.html()).toMatchSnapshot();
        });

        describe('props', () => {
            describe('min', () => {
                it('should be defined', () => {
                    expect(wrapper.vm.min).toBeDefined();
                    expect(wrapper.vm.min).toEqual(0);
                });
            });

            describe('max', () => {
                it('should be defined', () => {
                    expect(wrapper.vm.max).toBeDefined();
                    expect(wrapper.vm.max).toEqual(100);
                });
            });

            describe('value', () => {
                it('should be defined', () => {
                    expect(wrapper.vm.value).toBeDefined();
                    expect(wrapper.vm.value).toEqual(0);
                });
            });
        });

        describe('computed', () => {
            describe('progress()', () => {
                it('should be defined', () => {
                    expect(wrapper.vm.progress).toBeDefined();
                    expect(wrapper.vm.progress).toEqual(0);
                });

                it('should return percentage based on default minimum and maximum value', () => {
                    wrapper.setProps({ value: 50 });

                    expect(wrapper.vm.progress).toEqual(50);
                });

                it('should return percentage based on custom minimum and maximum value', () => {
                    wrapper.setProps({ value: 5, min: 0, max: 10 });

                    expect(wrapper.vm.progress).toEqual(50);
                });
            });

            describe('progress()', () => {
                it('should be defined', () => {
                    expect(wrapper.vm.style).toBeDefined();
                    expect(wrapper.vm.style).toEqual('width: 0%');
                });

                it('should return style based on progress', () => {
                    wrapper.setProps({ value: 50 });
                    expect(wrapper.vm.style).toEqual('width: 50%');
                });
            });
        });
    });
});
