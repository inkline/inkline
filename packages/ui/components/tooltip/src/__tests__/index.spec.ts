import { render, fireEvent } from '@testing-library/vue';
import Tooltip from '../Tooltip.vue';
import { createTestingInklineOptionsProvide } from '@inkline/test-utils';

describe('Components', () => {
    describe('Tooltip', () => {
        const props = {
            name: 'tooltip'
        };

        const slots = {
            default: '<div>Tooltip</div>',
            content: '<p>Tooltip content</p>'
        };

        it('should be named correctly', () => {
            expect(Tooltip.name).toEqual('Tooltip');
        });

        it('should render correctly', () => {
            const wrapper = render(Tooltip, {
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
            const wrapper = render(Tooltip, {
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
            const tooltip = wrapper.getByRole('tooltip', { hidden: true });

            expect(tooltip).toHaveClass(`-light`, `-md`);
        });

        it('should show tooltip when visible prop is true', () => {
            const wrapper = render(Tooltip, {
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
            const tooltip = wrapper.getByRole('tooltip');

            expect(tooltip).toBeVisible();
        });

        it('should hide tooltip when visible prop is false', () => {
            const wrapper = render(Tooltip, {
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

            const tooltip = wrapper.getByRole('tooltip', { hidden: true });

            expect(tooltip).not.toBeVisible();
        });

        it('should emit update:visible event when visibility changes', async () => {
            const wrapper = render(Tooltip, {
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
            const wrapper = render(Tooltip, {
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

            expect(wrapper.container.querySelector('.tooltip-arrow')).toBeInTheDocument();
        });

        it('should not render arrow when arrow prop is false', () => {
            const wrapper = render(Tooltip, {
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

            expect(wrapper.container.querySelector('.tooltip-arrow')).not.toBeInTheDocument();
        });
    });
});
