import { render } from '@testing-library/vue';
import { ButtonGroup } from '../index';
import { ButtonGroupKey } from '@inkline/types';
import { createTestingInklineOptionsProvide } from '@inkline/test-utils';
import { ref } from 'vue';

describe('Components', () => {
    describe('ButtonGroup', () => {
        const props = {};

        it('should be named correctly', () => {
            expect(ButtonGroup.name).toEqual('ButtonGroup');
        });

        it('should render correctly', () => {
            const wrapper = render(ButtonGroup, {
                props,
                global: {
                    provide: {
                        ...createTestingInklineOptionsProvide()
                    }
                }
            });

            expect(wrapper.html()).toMatchSnapshot();
        });

        describe('computed', () => {
            describe('classes', () => {
                it('should add classes based on props', () => {
                    const wrapper = render(ButtonGroup, {
                        props: {
                            vertical: true,
                            block: true,
                            disabled: true,
                            ...props
                        },
                        global: {
                            provide: {
                                ...createTestingInklineOptionsProvide()
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
                    const wrapper = render(ButtonGroup, {
                        props: {
                            disabled: true,
                            ...props
                        },
                        global: {
                            provide: {
                                ...createTestingInklineOptionsProvide()
                            }
                        }
                    });

                    expect(wrapper.container.firstChild).toHaveAttribute('aria-disabled', 'true');
                });

                it('should be disabled if buttonGroup is disabled', () => {
                    const wrapper = render(ButtonGroup, {
                        global: {
                            provide: {
                                [ButtonGroupKey as symbol]: {
                                    disabled: ref(true),
                                    color: ref(''),
                                    size: ref('')
                                },
                                ...createTestingInklineOptionsProvide()
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
