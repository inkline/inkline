import { render } from '@testing-library/vue';
import { ITab } from '@inkline/inkline/components';
import { InklineKey } from '@inkline/inkline/plugin';
import { createInkline } from '@inkline/inkline/__tests__/utils';
import { TabsKey } from '@inkline/inkline/components/ITabs/mixin';
import { ref } from 'vue';

describe('Components', () => {
    describe('ITab', () => {
        const props = {
            name: 'tab'
        };

        it('should be named correctly', () => {
            expect(ITab.name).toEqual('ITab');
        });

        it('should render correctly', () => {
            const wrapper = render(ITab, {
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
            describe('name', () => {
                it('should have randomly generated name uid', () => {
                    const wrapper = render(ITab, {
                        global: {
                            provide: {
                                [InklineKey as symbol]: createInkline()
                            }
                        }
                    });

                    expect(wrapper.container.firstChild).toHaveAttribute(
                        'name',
                        expect.stringContaining('tab')
                    );
                });
            });
        });

        describe('computed', () => {
            describe('classes', () => {
                it("should have '-active' class if active", () => {
                    const wrapper = render(ITab, {
                        global: {
                            provide: {
                                [InklineKey as symbol]: createInkline(),
                                [TabsKey as symbol]: {
                                    synchronize: () => {},
                                    active: ref('tab')
                                }
                            }
                        },
                        props
                    });

                    expect(wrapper.container.firstChild).toHaveClass('-active');
                });

                it("should not have '-active' class if not active", () => {
                    const wrapper = render(ITab, {
                        global: {
                            provide: {
                                [InklineKey as symbol]: createInkline(),
                                [TabsKey as symbol]: {
                                    synchronize: () => {},
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
    });
});
