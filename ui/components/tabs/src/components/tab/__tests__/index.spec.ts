import { render } from '@testing-library/vue';
import { Tab } from '../index';

import { createTestingInklineOptionsProvide } from '@inkline/test-utils';
import { createTestingTabsProvide } from '../../../__tests__/utils';

describe('Components', () => {
    describe('Tab', () => {
        const props = {
            name: 'tab'
        };

        it('should be named correctly', () => {
            expect(Tab.name).toEqual('Tab');
        });

        it('should render correctly', () => {
            const wrapper = render(Tab, {
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
                    const wrapper = render(Tab, {
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
                    const wrapper = render(Tab, {
                        global: {
                            provide: {
                                ...createTestingInklineOptionsProvide(),
                                ...createTestingTabsProvide({
                                    active: 'other'
                                })
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
