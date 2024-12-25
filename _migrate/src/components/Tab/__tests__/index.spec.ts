import { render } from '@testing-library/vue';
import { Tab } from '@inkline/inkline/components';

import { createTestingInklineOptionsProvide } from '@inkline/test-utils';
import { TabsKey } from '@inkline/inkline';
import { ref } from 'vue';

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
                        ...createTestingInklineOptionsProvide()
                    }
                }
            });

            expect(wrapper.html()).toMatchSnapshot();
        });

        describe('props', () => {
            describe('name', () => {
                it('should have randomly generated name uid', () => {
                    const wrapper = render(Tab, {
                        global: {
                            provide: {
                                ...createTestingInklineOptionsProvide()
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
                    const wrapper = render(Tab, {
                        global: {
                            provide: {
                                ...createTestingInklineOptionsProvide(),
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
                    const wrapper = render(Tab, {
                        global: {
                            provide: {
                                ...createTestingInklineOptionsProvide(),
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
