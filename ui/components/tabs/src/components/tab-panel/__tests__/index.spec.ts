import { render } from '@testing-library/vue';
import { TabPanel } from '../index';

import { createTestingInklineOptionsProvide } from '@inkline/test-utils';
import { TabsKey } from '@inkline/types';
import { ref } from 'vue';
import { createTestingTabsProvide } from '../../../__tests__/utils';

describe('Components', () => {
    describe('TabPanel', () => {
        const props = {
            name: 'tab'
        };

        it('should be named correctly', () => {
            expect(TabPanel.name).toEqual('TabPanel');
        });

        it('should render correctly', () => {
            const wrapper = render(TabPanel, {
                props,
                global: {
                    provide: {
                        ...createTestingInklineOptionsProvide(),
                        ...createTestingTabsProvide()
                    }
                }
            });

            expect(wrapper.html()).toMatchSnapshot();
        });

        describe('computed', () => {
            describe('classes', () => {
                it("should have '-active' class if active", () => {
                    const wrapper = render(TabPanel, {
                        global: {
                            provide: {
                                ...createTestingInklineOptionsProvide(),
                                ...createTestingTabsProvide()
                            }
                        },
                        props
                    });

                    expect(wrapper.container.firstChild).toHaveClass('-active');
                });

                it("should not have '-active' class if not active", () => {
                    const wrapper = render(TabPanel, {
                        global: {
                            provide: {
                                ...createTestingInklineOptionsProvide(),
                                ...createTestingTabsProvide({ active: 'other' })
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
