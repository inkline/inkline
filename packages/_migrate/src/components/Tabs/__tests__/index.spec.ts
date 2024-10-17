import { fireEvent, render } from '@testing-library/vue';
import { Tabs, Tab, TabTitle } from '@inkline/inkline/components';

import { createTestingInklineOptionsProvide } from '@inkline/test-utils';

describe('Components', () => {
    describe('Tabs', () => {
        const stubs = {
            'i-tab': Tab,
            'i-tab-title': TabTitle
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
            expect(Tabs.name).toEqual('Tabs');
        });

        it('should render correctly without header', () => {
            const wrapper = render(Tabs, {
                global: {
                    stubs,
                    provide: {
                        ...createTestingInklineOptionsProvide()
                    }
                },
                props,
                slots: slotsDefault
            });

            expect(wrapper.html()).toMatchSnapshot();
        });

        it('should render correctly with header', () => {
            const wrapper = render(Tabs, {
                global: {
                    stubs,
                    provide: {
                        ...createTestingInklineOptionsProvide()
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
                    const wrapper = render(Tabs, {
                        global: {
                            stubs,
                            provide: {
                                ...createTestingInklineOptionsProvide()
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
                    const wrapper = render(Tabs, {
                        global: {
                            stubs,
                            provide: {
                                ...createTestingInklineOptionsProvide()
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
