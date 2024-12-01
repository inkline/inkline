import { fireEvent, render } from '@testing-library/vue';
import { DropdownItem } from '@inkline/inkline/components';

import { createTestingInklineOptionsProvide } from '@inkline/test-utils';
import { DropdownKey } from '@inkline/inkline';
import { ref } from 'vue';

describe('Components', () => {
    describe('DropdownItem', () => {
        const props = {};

        it('should be named correctly', () => {
            expect(DropdownItem.name).toEqual('DropdownItem');
        });

        it('should render correctly', () => {
            const wrapper = render(DropdownItem, {
                props,
                global: {
                    provide: {
                        ...createTestingInklineOptionsProvide()
                    }
                }
            });

            expect(wrapper.html()).toMatchSnapshot();
        });

        describe('computed', () => {
            describe('classes', () => {
                it('should add classes based on props', () => {
                    const wrapper = render(DropdownItem, {
                        props: {
                            active: true,
                            disabled: true,
                            plaintext: true
                        },
                        global: {
                            provide: {
                                ...createTestingInklineOptionsProvide()
                            }
                        }
                    });

                    expect(wrapper.container.firstChild).toHaveClass(
                        '-active',
                        '-disabled',
                        '-plaintext'
                    );
                });
            });

            describe('tabIndex', () => {
                it('should be -1 if disabled', () => {
                    const wrapper = render(DropdownItem, {
                        props: {
                            disabled: true,
                            ...props
                        },
                        global: {
                            provide: {
                                ...createTestingInklineOptionsProvide()
                            }
                        }
                    });

                    expect(wrapper.container.firstChild).toHaveAttribute('tabindex', '-1');
                });

                it('should be 1 otherwise', () => {
                    const wrapper = render(DropdownItem, {
                        props,
                        global: {
                            provide: {
                                ...createTestingInklineOptionsProvide()
                            }
                        }
                    });

                    expect(wrapper.container.firstChild).toHaveAttribute('tabindex', '0');
                });
            });
        });

        describe('methods', () => {
            describe('onClick()', () => {
                it('should call dropdown onItemClick', async () => {
                    const onItemClick = vi.fn();
                    const wrapper = render(DropdownItem, {
                        global: {
                            provide: {
                                ...createTestingInklineOptionsProvide(),
                                [DropdownKey as symbol]: {
                                    disabled: ref(false),
                                    color: ref('light'),
                                    size: ref('md'),
                                    onItemClick
                                }
                            }
                        },
                        props
                    });
                    const item = await wrapper.getByRole('menuitem');
                    await fireEvent.click(item);
                    expect(onItemClick).toHaveBeenCalled();
                });

                it('should not call dropdown onItemClick if not inside dropdown', async () => {
                    const onItemClick = vi.fn();
                    const wrapper = render(DropdownItem, {
                        global: {
                            provide: {
                                ...createTestingInklineOptionsProvide()
                            }
                        },
                        props
                    });
                    const item = await wrapper.getByRole('menuitem');
                    await fireEvent.click(item);
                    expect(onItemClick).not.toHaveBeenCalled();
                });
            });
        });
    });
});
