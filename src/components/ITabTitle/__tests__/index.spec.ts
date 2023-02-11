import { fireEvent, render } from '@testing-library/vue';
import { ITabTitle } from '@inkline/inkline/components';
import { InklineKey } from '@inkline/inkline/plugin';
import { createInkline } from '@inkline/inkline/__tests__/utils';
import { ref } from 'vue';
import { TabsKey } from '@inkline/inkline/components/ITabs/mixin';

describe('Components', () => {
    describe('ITabTitle', () => {
        const props = {
            for: 'tab'
        };

        it('should be named correctly', () => {
            expect(ITabTitle.name).toEqual('ITabTitle');
        });

        it('should render correctly', () => {
            const wrapper = render(ITabTitle, {
                props,
                global: {
                    provide: {
                        [InklineKey as symbol]: createInkline()
                    }
                }
            });

            expect(wrapper.html()).toMatchSnapshot();
        });

        describe('props', () => {
            describe('for', () => {
                it('should have randomly generated name uid', () => {
                    const wrapper = render(ITabTitle, {
                        global: {
                            provide: {
                                [InklineKey as symbol]: createInkline()
                            }
                        }
                    });

                    expect(wrapper.container.firstChild).toHaveAttribute(
                        'for',
                        expect.stringContaining('tab')
                    );
                });
            });
        });

        describe('computed', () => {
            describe('classes', () => {
                it("should have '-active' class if active", () => {
                    const wrapper = render(ITabTitle, {
                        global: {
                            provide: {
                                [InklineKey as symbol]: createInkline(),
                                [TabsKey as symbol]: {
                                    active: ref('tab')
                                }
                            }
                        },
                        props
                    });

                    expect(wrapper.container.firstChild).toHaveClass('-active');
                });

                it("should not have '-active' class if not active", () => {
                    const wrapper = render(ITabTitle, {
                        global: {
                            provide: {
                                [InklineKey as symbol]: createInkline(),
                                [TabsKey as symbol]: {
                                    active: ref('other')
                                }
                            }
                        },
                        props
                    });

                    expect(wrapper.container.firstChild).not.toHaveClass('-active');
                });
            });
        });

        describe('methods', () => {
            describe('onClick()', () => {
                it('should have call tabs setActive', async () => {
                    const setActive = vi.fn();
                    const wrapper = render(ITabTitle, {
                        global: {
                            provide: {
                                [InklineKey as symbol]: createInkline(),
                                [TabsKey as symbol]: {
                                    active: ref(null),
                                    setActive
                                }
                            }
                        },
                        props
                    });

                    await fireEvent.click(wrapper.container.firstChild as Element);

                    expect(setActive).toHaveBeenCalledWith(props.for);
                });
            });
        });
    });
});
