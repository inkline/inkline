import { fireEvent, render } from '@testing-library/vue';
import { TabTitle } from '@inkline/inkline/components';

import { createTestingInklineOptionsProvide } from '@inkline/test-utils';
import { ref } from 'vue';
import { TabsKey } from '@inkline/inkline';

describe('Components', () => {
    describe('TabTitle', () => {
        const props = {
            for: 'tab'
        };

        it('should be named correctly', () => {
            expect(TabTitle.name).toEqual('TabTitle');
        });

        it('should render correctly', () => {
            const wrapper = render(TabTitle, {
                props,
                global: {
                    provide: {
                        ...createTestingInklineOptionsProvide()
                    }
                }
            });

            expect(wrapper.html()).toMatchSnapshot();
        });

        describe('props', () => {
            describe('for', () => {
                it('should have randomly generated name uid', () => {
                    const wrapper = render(TabTitle, {
                        global: {
                            provide: {
                                ...createTestingInklineOptionsProvide()
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
                    const wrapper = render(TabTitle, {
                        global: {
                            provide: {
                                ...createTestingInklineOptionsProvide(),
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
                    const wrapper = render(TabTitle, {
                        global: {
                            provide: {
                                ...createTestingInklineOptionsProvide(),
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
                    const wrapper = render(TabTitle, {
                        global: {
                            provide: {
                                ...createTestingInklineOptionsProvide(),
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
