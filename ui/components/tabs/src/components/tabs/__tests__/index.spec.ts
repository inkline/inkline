import { fireEvent, render } from '@testing-library/vue';
import { createTestingInklineOptionsProvide } from '@inkline/test-utils';

import { Tabs } from '../index';
import { Tab } from '../../tab';
import { TabList } from '../../tab-list';
import { TabPanel } from '../../tab-panel';

describe('Components', () => {
    describe('Tabs', () => {
        const stubs = {
            Tab,
            TabList,
            TabPanel
        };

        const props = {
            color: 'light',
            size: 'md'
        };

        const slots = {
            default: [
                '<TabList>' +
                    '<Tab name="tab-1">Tab 1</Tab>' +
                    '<Tab name="tab-2">Tab 2</Tab>' +
                    '<Tab name="tab-3">Tab 3</Tab>' +
                    '</TabList>',
                '<TabPanel name="tab-1" title="Tab 1">Tab 1 content</TabPanel>',
                '<TabPanel name="tab-2" title="Tab 2">Tab 2 content</TabPanel>',
                '<TabPanel name="tab-3" title="Tab 3">Tab 3 content</TabPanel>'
            ]
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
                slots
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

                    const tabTitles = wrapper.getAllByRole('tab');
                    await fireEvent.click(tabTitles[0]);

                    expect(tabTitles[0]).toHaveClass('-active');
                    expect(wrapper.emitted()['update:modelValue'][0]).toEqual(['tab-1']);
                });
            });
        });
    });
});
