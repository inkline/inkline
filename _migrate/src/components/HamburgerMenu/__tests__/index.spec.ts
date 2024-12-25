import { fireEvent, render } from '@testing-library/vue';
import { HamburgerMenu } from '@inkline/inkline/components';

import { createTestingInklineOptionsProvide } from '@inkline/test-utils';

describe('Components', () => {
    describe('HamburgerMenu', () => {
        const props = {
            color: 'light'
        };

        it('should be named correctly', () => {
            expect(HamburgerMenu.name).toEqual('HamburgerMenu');
        });

        it('should render correctly', () => {
            const wrapper = render(HamburgerMenu, {
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
                    const animation = 'animation';
                    const wrapper = render(HamburgerMenu, {
                        props: {
                            modelValue: true,
                            animation,
                            ...props
                        },
                        global: {
                            provide: {
                                ...createTestingInklineOptionsProvide()
                            }
                        }
                    });

                    expect(wrapper.container.firstChild).toHaveClass(
                        `-${props.color}`,
                        `-${animation}`,
                        '-active'
                    );
                });
            });
        });

        describe('methods', () => {
            describe('onClick()', () => {
                it('should emit update:modelValue with toggled value', async () => {
                    const wrapper = render(HamburgerMenu, {
                        props: {
                            modelValue: true,
                            ...props
                        },
                        global: {
                            provide: {
                                ...createTestingInklineOptionsProvide()
                            }
                        }
                    });

                    await fireEvent.click(wrapper.container.firstChild as Element);

                    expect(wrapper.emitted()['update:modelValue'][0]).toEqual([false]);
                });
            });
        });
    });
});
