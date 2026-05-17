import { render, fireEvent } from '@testing-library/vue';
import Popover from '../components/popover/Popover.vue';
import { createTestingInklineOptionsProvide } from '@inkline/test-utils';

describe('Components', () => {
    describe('Popover', () => {
        const props = {
            name: 'popover'
        };

        const slots = {
            default: '<div>Popover</div>'
        };

        it('should be named correctly', () => {
            expect(Popover.name).toEqual('Popover');
        });

        it('should render correctly', () => {
            const wrapper = render(Popover, {
                props,
                slots,
                global: {
                    provide: {
                        ...createTestingInklineOptionsProvide()
                    }
                }
            });

            expect(wrapper.html()).toMatchSnapshot();
        });

        it('should apply color and size classes based on props', () => {
            const wrapper = render(Popover, {
                props: {
                    color: 'light',
                    size: 'md'
                },
                slots,
                global: {
                    provide: {
                        ...createTestingInklineOptionsProvide()
                    }
                }
            });
            const popover = wrapper.getByRole('popover', { hidden: true });

            expect(popover).toHaveClass(`-light`, `-md`);
        });

        it('should show popover when visible prop is true', () => {
            const wrapper = render(Popover, {
                props: {
                    ...props,
                    visible: true
                },
                slots,
                global: {
                    provide: {
                        ...createTestingInklineOptionsProvide()
                    }
                }
            });
            const popover = wrapper.getByRole('popover');

            expect(popover).toBeVisible();
        });

        it('should hide popover when visible prop is false', () => {
            const wrapper = render(Popover, {
                props: {
                    ...props,
                    visible: false
                },
                slots,
                global: {
                    provide: {
                        ...createTestingInklineOptionsProvide()
                    }
                }
            });

            const popover = wrapper.getByRole('popover', { hidden: true });

            expect(popover).not.toBeVisible();
        });

        it('should emit update:visible event when visibility changes', async () => {
            const wrapper = render(Popover, {
                props,
                slots,
                global: {
                    provide: {
                        ...createTestingInklineOptionsProvide()
                    }
                }
            });

            await fireEvent.mouseEnter(wrapper.getByRole('button'));

            expect(wrapper.emitted()['update:visible']).toBeTruthy();
        });

        it('should render arrow when arrow prop is true', () => {
            const wrapper = render(Popover, {
                props: {
                    ...props,
                    arrow: true
                },
                global: {
                    provide: {
                        ...createTestingInklineOptionsProvide()
                    }
                }
            });

            expect(wrapper.container.querySelector('.popover-arrow')).toBeInTheDocument();
        });

        it('should not render arrow when arrow prop is false', () => {
            const wrapper = render(Popover, {
                props: {
                    ...props,
                    arrow: false
                },
                global: {
                    provide: {
                        ...createTestingInklineOptionsProvide()
                    }
                }
            });

            expect(wrapper.container.querySelector('.popover-arrow')).not.toBeInTheDocument();
        });

        it('should render header slot content', () => {
            const wrapper = render(Popover, {
                props,
                slots: {
                    ...slots,
                    header: '<div>Header Content</div>'
                },
                global: {
                    provide: {
                        ...createTestingInklineOptionsProvide()
                    }
                }
            });

            expect(wrapper.getByText('Header Content')).toBeInTheDocument();
        });

        it('should render body slot content', () => {
            const wrapper = render(Popover, {
                props,
                slots: {
                    ...slots,
                    body: '<div>Body Content</div>'
                },
                global: {
                    provide: {
                        ...createTestingInklineOptionsProvide()
                    }
                }
            });

            expect(wrapper.getByText('Body Content')).toBeInTheDocument();
        });

        it('should render footer slot content', () => {
            const wrapper = render(Popover, {
                props,
                slots: {
                    ...slots,
                    footer: '<div>Footer Content</div>'
                },
                global: {
                    provide: {
                        ...createTestingInklineOptionsProvide()
                    }
                }
            });

            expect(wrapper.getByText('Footer Content')).toBeInTheDocument();
        });
    });
});
