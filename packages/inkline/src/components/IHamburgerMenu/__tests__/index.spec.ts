import { fireEvent, render } from '@testing-library/vue';
import { IHamburgerMenu } from '@inkline/inkline/components';
import { InklineKey } from '@inkline/inkline/constants';
import { createInkline } from '@inkline/inkline/__tests__/utils';

describe('Components', () => {
    describe('IHamburgerMenu', () => {
        const props = {
            color: 'light'
        };

        it('should be named correctly', () => {
            expect(IHamburgerMenu.name).toEqual('IHamburgerMenu');
        });

        it('should render correctly', () => {
            const wrapper = render(IHamburgerMenu, {
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
                    const animation = 'animation';
                    const wrapper = render(IHamburgerMenu, {
                        props: {
                            modelValue: true,
                            animation,
                            ...props
                        },
                        global: {
                            provide: {
                                [InklineKey as symbol]: createInkline()
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
                    const wrapper = render(IHamburgerMenu, {
                        props: {
                            modelValue: true,
                            ...props
                        },
                        global: {
                            provide: {
                                [InklineKey as symbol]: createInkline()
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
