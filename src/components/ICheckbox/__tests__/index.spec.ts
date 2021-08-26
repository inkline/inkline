import { shallowMount } from '@vue/test-utils';
import {IButton, ICheckbox} from '@inkline/inkline/components';

describe('Components', () => {
    describe('ICheckbox', () => {
        const props = {
            color: 'light',
            size: 'md'
        };

        it('should be named correctly', () => {
            expect(ICheckbox.name).toEqual('ICheckbox');
        });

        it('should render correctly', () => {
            const wrapper = shallowMount(ICheckbox, { props });
            expect(wrapper.html()).toMatchSnapshot();
        });

        describe('computed', () => {
            describe('classes', () => {
                it('should return classes object', () => {
                    const wrapper: any = shallowMount(ICheckbox, {
                        props: {
                            disabled: true,
                            readonly: true,
                            native: true,
                            ...props
                        }
                    });

                    expect(wrapper.vm.classes).toEqual({
                        [`-${wrapper.vm.color}`]: true,
                        [`-${wrapper.vm.size}`]: true,
                        '-disabled': true,
                        '-readonly': true,
                        '-native': true
                    });
                });
            });

            describe('checked', () => {
                it('should return true if formGroup.checked contains value', () => {
                    const value = 'value';
                    const wrapper: any = shallowMount(ICheckbox, {
                        global: {
                            provide: {
                                formGroup: {
                                    checked: [value]
                                }
                            }
                        },
                        props: {
                            value,
                            ...props
                        }
                    });

                    expect(wrapper.vm.checked).toEqual(true);
                });
            });

            describe('tabIndex', () => {
                it('should return -1 if disabled', () => {
                    const wrapper: any = shallowMount(IButton, {
                        props: {
                            disabled: true,
                            ...props
                        }
                    });

                    expect(wrapper.vm.tabIndex).toEqual(-1);
                });

                it('should return tabindex otherwise', () => {
                    const wrapper: any = shallowMount(IButton, { props });

                    expect(wrapper.vm.tabIndex).toEqual(wrapper.vm.tabindex);
                });
            });
        });
    });
});
