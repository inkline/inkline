import { shallowMount } from '@vue/test-utils';
import { IButton } from '@inkline/inkline/components';

describe('Components', () => {
    describe('IButton', () => {
        const props = {
            color: 'light',
            size: 'md'
        };

        it('should be named correctly', () => {
            expect(IButton.name).toEqual('IButton');
        });

        it('should render correctly', () => {
            const wrapper = shallowMount(IButton, { props });
            expect(wrapper.html()).toMatchSnapshot();
        });

        describe('computed', () => {
            describe('classes', () => {
                it('should return classes object', () => {
                    const wrapper: any = shallowMount(IButton, {
                        props: {
                            active: true,
                            block: true,
                            circle: true,
                            disabled: true,
                            link: true,
                            outline: true,
                            ...props
                        }
                    });

                    expect(wrapper.vm.classes).toEqual({
                        [`-${wrapper.vm.color}`]: true,
                        [`-${wrapper.vm.size}`]: true,
                        '-active': true,
                        '-block': true,
                        '-circle': true,
                        '-disabled': true,
                        '-link': true,
                        '-outline': true,
                    });
                });
            });

            describe('isDisabled', () => {
                it('should return true if disabled', () => {
                    const wrapper: any = shallowMount(IButton, {
                        props: {
                            disabled: true,
                            ...props
                        }
                    });

                    expect(wrapper.vm.isDisabled).toEqual(true);
                });

                it('should return true if buttonGroup is disabled', () => {
                    const wrapper: any = shallowMount(IButton, {
                        global: {
                            provide: {
                                buttonGroup: {
                                    disabled: true
                                }
                            }
                        },
                        props
                    });

                    expect(wrapper.vm.isDisabled).toEqual(true);
                });

                it('should return true if form is disabled', () => {
                    const wrapper: any = shallowMount(IButton, {
                        global: {
                            provide: {
                                form: {
                                    disabled: true
                                }
                            }
                        },
                        props
                    });

                    expect(wrapper.vm.isDisabled).toEqual(true);
                });

                it('should return true if formGroup is disabled', () => {
                    const wrapper: any = shallowMount(IButton, {
                        global: {
                            provide: {
                                formGroup: {
                                    disabled: true
                                }
                            }
                        },
                        props
                    });

                    expect(wrapper.vm.isDisabled).toEqual(true);
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
