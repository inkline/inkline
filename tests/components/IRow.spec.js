import { shallowMount } from '@vue/test-utils';
import { IRow } from '@inkline/inkline/src/components';
import { capitalizeFirst } from "@inkline/inkline/src/helpers";
import { breakpointKeys } from '@inkline/inkline/src/constants';

describe('Components', () => {
    describe('IRow', () => {
        let wrapper;

        beforeEach(() => {
            wrapper = shallowMount(IRow);
        });

        it('should be named correctly', () => {
            expect(IRow.name).toEqual('IRow');
        });

        it('should render correctly', () => {
            expect(wrapper.html()).toMatchSnapshot();
        });

        describe('props', () => {
            describe('noGutter', () => {
                it('should be defined', () => {
                    expect(wrapper.vm.noGutter).toBeDefined();
                    expect(wrapper.vm.noGutter).toEqual(false);
                });
            });

            describe('noCollapse', () => {
                it('should be defined', () => {
                    expect(wrapper.vm.noCollapse).toBeDefined();
                    expect(wrapper.vm.noCollapse).toEqual(false);
                });
            });

            breakpointKeys.forEach((breakpoint) => {
                ['start', 'center', 'end', 'top', 'middle', 'bottom', 'around', 'between', 'reverse']
                    .forEach((modifierName) => {
                        const modifier = modifierName + capitalizeFirst(breakpoint);
                        describe(modifier, () => {
                            it('should be defined', () => {
                                expect(wrapper.vm[modifier]).toBeDefined();
                                expect(wrapper.vm[modifier]).toEqual(false);
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
                        startXs: 12,
                        end: true,
                        between: 12,
                        noCollapse: true,
                        noGutter: true,
                    });

                    expect(wrapper.vm.classes).toEqual(['-no-gutter', '-no-collapse', '-end', '-between-12', '-start-xs-12'])
                });
            });
        });
    });
});
