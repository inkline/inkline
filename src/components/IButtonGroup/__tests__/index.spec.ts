import { render } from '@testing-library/vue';
import { IButtonGroup } from '@inkline/inkline/components';
import { InklineKey } from '@inkline/inkline/constants';
import { createInkline } from '@inkline/inkline/__tests__/utils';
import { ButtonGroupKey } from '@inkline/inkline';
import { ref } from 'vue';

describe('Components', () => {
    describe('IButtonGroup', () => {
        const props = {};

        it('should be named correctly', () => {
            expect(IButtonGroup.name).toEqual('IButtonGroup');
        });

        it('should render correctly', () => {
            const wrapper = render(IButtonGroup, {
                props,
                global: {
                    provide: {
                        [InklineKey as symbol]: createInkline()
                    }
                }
            });

            expect(wrapper.html()).toMatchSnapshot();
        });

        describe('computed', () => {
            describe('classes', () => {
                it('should add classes based on props', () => {
                    const wrapper = render(IButtonGroup, {
                        props: {
                            vertical: true,
                            block: true,
                            disabled: true,
                            ...props
                        },
                        global: {
                            provide: {
                                [InklineKey as symbol]: createInkline()
                            }
                        }
                    });

                    expect(wrapper.container.firstChild).toHaveClass(
                        '-vertical',
                        '-block',
                        '-disabled'
                    );
                });
            });

            describe('isDisabled', () => {
                it('should be disabled if disabled', () => {
                    const wrapper = render(IButtonGroup, {
                        props: {
                            disabled: true,
                            ...props
                        },
                        global: {
                            provide: {
                                [InklineKey as symbol]: createInkline()
                            }
                        }
                    });

                    expect(wrapper.container.firstChild).toHaveAttribute('aria-disabled', 'true');
                });

                it('should be disabled if buttonGroup is disabled', () => {
                    const wrapper = render(IButtonGroup, {
                        global: {
                            provide: {
                                [ButtonGroupKey as symbol]: {
                                    disabled: ref(true),
                                    color: ref(''),
                                    size: ref('')
                                },
                                [InklineKey as symbol]: createInkline()
                            }
                        },
                        props
                    });

                    expect(wrapper.container.firstChild).toHaveAttribute('aria-disabled', 'true');
                });
            });
        });
    });
});
