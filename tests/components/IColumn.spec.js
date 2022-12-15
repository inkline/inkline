import { shallowMount } from '@vue/test-utils';
import { IColumn } from '@inkline/inkline/src/components';
import { capitalizeFirst } from "@inkline/inkline/src/helpers";
import { breakpointKeys } from '@inkline/inkline/src/constants';

describe('Components', () => {
    describe('IColumn', () => {
        let wrapper;

        beforeEach(() => {
            wrapper = shallowMount(IColumn);
        });

        it('should be named correctly', () => {
            expect(IColumn.name).toEqual('IColumn');
        });

        it('should render correctly', () => {
            expect(wrapper.html()).toMatchSnapshot();
        });

        describe('props', () => {
            breakpointKeys.slice(1).forEach((breakpoint) => {
                describe(breakpoint, () => {
                    it('should be defined', () => {
                        expect(wrapper.vm[breakpoint]).toBeDefined();
                        expect(wrapper.vm[breakpoint]).toEqual(false);
                    });
                });

                ['first', 'last'].forEach((modifierName) => {
                    const modifier = modifierName + capitalizeFirst(breakpoint);
                    describe(modifier, () => {
                        it('should be defined', () => {
                            expect(wrapper.vm[modifier]).toBeDefined();
                            expect(wrapper.vm[modifier]).toEqual(false);
                        });
                    });
                });

                ['offset', 'push', 'pull'].forEach((modifierName) => {
                    const modifier = modifierName + capitalizeFirst(breakpoint);
                    describe(modifier, () => {
                        it('should be defined', () => {
                            expect(wrapper.vm[modifier]).toBeDefined();
                            expect(wrapper.vm[modifier]).toEqual('');
                        });
                    });
                });
            });
        });

        describe('computed', () => {
            describe('classes()', () => {
                it('should return empty classes array if no active properties', () => {
                    expect(wrapper.vm.classes).toEqual([]);
                });

                it('should return classes based on active properties', () => {
                    wrapper.setProps({
                        xs: 12,
                        firstXs: true,
                        offsetXs: 12
                    });

                    expect(wrapper.vm.classes).toEqual(['-xs-12', '-first-xs', '-offset-xs-12'])
                });
            });
        });
    });
});
