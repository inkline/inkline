import { fireEvent, render } from '@testing-library/vue';
import { ITabs, ITab, ITabTitle } from '@inkline/inkline/components';
import { InklineKey } from '@inkline/inkline/constants';
import { createInkline } from '@inkline/inkline/__tests__/utils';

describe('Components', () => {
    describe('ITabs', () => {
        const stubs = {
            'i-tab': ITab,
            'i-tab-title': ITabTitle
        };

        const props = {
            color: 'light',
            size: 'md'
        };

        const slotsDefault = {
            default: [
                '<i-tab name="tab-1" title="Tab 1">Tab 1 content</i-tab>',
                '<i-tab name="tab-2" title="Tab 2">Tab 2 content</i-tab>',
                '<i-tab name="tab-3" title="Tab 3">Tab 3 content</i-tab>'
            ]
        };

        const slots = {
            header: [
                '<i-tab-title for="tab-1">Tab 1</i-tab-title>',
                '<i-tab-title for="tab-2">Tab 2</i-tab-title>',
                '<i-tab-title for="tab-3">Tab 3</i-tab-title>'
            ],
            ...slotsDefault
        };

        it('should be named correctly', () => {
            expect(ITabs.name).toEqual('ITabs');
        });

        it('should render correctly without header', () => {
            const wrapper = render(ITabs, {
                global: {
                    stubs,
                    provide: {
                        [InklineKey as symbol]: createInkline()
                    }
                },
                props,
                slots: slotsDefault
            });

            expect(wrapper.html()).toMatchSnapshot();
        });

        it('should render correctly with header', () => {
            const wrapper = render(ITabs, {
                global: {
                    stubs,
                    provide: {
                        [InklineKey as symbol]: createInkline()
                    }
                },
                props,
                slots
            });

            expect(wrapper.html()).toMatchSnapshot();
        });

        describe('computed', () => {
            describe('classes', () => {
                it('should add classes based on props', () => {
                    const wrapper = render(ITabs, {
                        global: {
                            stubs,
                            provide: {
                                [InklineKey as symbol]: createInkline()
                            }
                        },
                        props: {
                            ...props,
                            stretch: true
                        },
                        slots
                    });

                    expect(wrapper.container.firstChild).toHaveClass('-light', '-md', '-stretch');
                });
            });
        });

        describe('methods', () => {
            describe('setActive()', () => {
                it('should add classes based on props', async () => {
                    const wrapper = render(ITabs, {
                        global: {
                            stubs,
                            provide: {
                                [InklineKey as symbol]: createInkline()
                            }
                        },
                        props,
                        slots
                    });

                    const tabTitles = await wrapper.getAllByRole('tab');
                    await fireEvent.click(tabTitles[0]);

                    expect(tabTitles[0]).toHaveClass('-active');
                    expect(wrapper.emitted()['update:modelValue'][0]).toEqual(['tab-1']);
                });
            });
        });
    });
});
