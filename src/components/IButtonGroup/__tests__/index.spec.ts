import { shallowMount } from '@vue/test-utils';
import { IButtonGroup } from '@inkline/inkline/components';

describe('Components', () => {
    describe('IButtonGroup', () => {
        const props = {
            size: 'md'
        };

        it('should be named correctly', () => {
            expect(IButtonGroup.name).toEqual('IButtonGroup');
        });

        it('should render correctly', () => {
            const wrapper = shallowMount(IButtonGroup, { props });
            expect(wrapper.html()).toMatchSnapshot();
        });

        describe('computed', () => {
            describe('classes', () => {
                it('should return classes object', () => {
                    const wrapper: any = shallowMount(IButtonGroup, {
                        props: {
                            vertical: true,
                            block: true,
                            disabled: true,
                            ...props
                        }
                    });

                    expect(wrapper.vm.classes).toEqual({
                        [`-${wrapper.vm.size}`]: true,
                        '-vertical': true,
                        '-block': true,
                        '-disabled': true
                    });
                });
            });

            describe('isDisabled', () => {
                it('should return true if disabled', () => {
                    const wrapper: any = shallowMount(IButtonGroup, {
                        props: {
                            disabled: true,
                            ...props
                        }
                    });

                    expect(wrapper.vm.isDisabled).toEqual(true);
                });

                it('should return true if buttonGroup is disabled', () => {
                    const wrapper: any = shallowMount(IButtonGroup, {
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
                    const wrapper: any = shallowMount(IButtonGroup, {
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
                    const wrapper: any = shallowMount(IButtonGroup, {
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
        });
    });
});
