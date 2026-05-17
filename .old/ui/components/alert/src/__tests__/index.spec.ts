import { fireEvent, render } from '@testing-library/vue';
import { Alert } from '../index';
import { createTestingInklineOptionsProvide } from '@inkline/test-utils';

describe('Components', () => {
    describe('Alert', () => {
        const props = {
            variant: ['info', 'md']
        };

        it('should be named correctly', () => {
            expect(Alert.name).toEqual('Alert');
        });

        it('should render correctly', () => {
            const wrapper = render(Alert, {
                props,
                global: {
                    provide: {
                        ...createTestingInklineOptionsProvide()
                    }
                }
            });
            expect(wrapper.html()).toMatchSnapshot();
        });

        describe('methods', () => {
            describe('dismiss()', () => {
                it('should hide the alert when clicking the dismiss button', async () => {
                    const wrapper = render(Alert, {
                        props: {
                            dismissible: true,
                            modelValue: true,
                            ...props
                        },
                        global: {
                            provide: {
                                ...createTestingInklineOptionsProvide()
                            }
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
