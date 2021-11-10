import { fireEvent, render } from '@testing-library/vue';
import { IAlert } from '@inkline/inkline/components';
import { Placeholder } from '@inkline/inkline/__mocks__';

describe('Components', () => {
    describe('IAlert', () => {
        const props = {
            color: 'primary',
            size: 'md'
        };

        it('should be named correctly', () => {
            expect(IAlert.name).toEqual('IAlert');
        });

        it('should render correctly', () => {
            const wrapper = render(IAlert, { props });
            expect(wrapper.html()).toMatchSnapshot();
        });

        describe('computed', () => {
            describe('classes', () => {
                it('should add classes based on props', () => {
                    const wrapper = render(IAlert, {
                        slots: {
                            icon: [Placeholder]
                        },
                        props: {
                            dismissible: true,
                            ...props
                        }
                    });

                    expect(wrapper.container.firstChild).toHaveClass(
                        `-${props.color}`,
                        `-${props.size}`,
                        '-dismissible',
                        '-with-icon'
                    );
                });
            });
        });

        describe('watch', () => {
            describe('modelValue', () => {
                it('should set dismissed', () => {
                    const wrapper = {
                        dismissed: false,
                        fn: (IAlert as any).watch.modelValue
                    };

                    wrapper.fn(false);

                    expect(wrapper.dismissed).toEqual(true);
                });
            });
        });

        describe('methods', () => {
            describe('dismiss()', () => {
                it('should hide the alert when clicking the dismiss button', async () => {
                    const wrapper = render(IAlert, {
                        props: {
                            dismissible: true,
                            modelValue: true,
                            ...props
                        }
                    });

                    expect(wrapper.container.firstChild).toBeVisible();
                    const dismissButton = await wrapper.findByLabelText('Dismiss');
                    await fireEvent.click(dismissButton);
                    expect(wrapper.emitted()['update:modelValue'][0]).toEqual([false]);
                    expect(wrapper.container.firstChild).not.toBeVisible();
                });
            });
        });
    });
});
