import { render, waitFor } from '@testing-library/vue';
import { ToastContainer } from '../index';
import { createEventBus } from '@inkline/utils';
import { createTestingInklineOptionsProvide } from '@inkline/test-utils';

describe('Components', () => {
    describe('ToastContainer', () => {
        const props = {};

        it('should be named correctly', () => {
            expect(ToastContainer.name).toEqual('ToastContainer');
        });

        it('should render correctly', () => {
            const wrapper = render(ToastContainer, {
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
            describe('showToast()', () => {
                it('should show a toast in every container position', async () => {
                    const eventBus = createEventBus();
                    const wrapper = render(ToastContainer, {
                        props: {
                            eventBus,
                            ...props
                        },
                        global: {
                            provide: {
                                ...createTestingInklineOptionsProvide()
                            }
                        }
                    });

                    eventBus.emit('show', { id: 'top-left', position: 'top-left' });
                    eventBus.emit('show', { id: 'top', position: 'top' });
                    eventBus.emit('show', { id: 'top-right', position: 'top-right' });
                    eventBus.emit('show', { id: 'right', position: 'right' });
                    eventBus.emit('show', { id: 'bottom-right', position: 'bottom-right' });
                    eventBus.emit('show', { id: 'bottom', position: 'bottom' });
                    eventBus.emit('show', { id: 'bottom-left', position: 'bottom-left' });
                    eventBus.emit('show', { id: 'left', position: 'left' });

                    await waitFor(() => {
                        expect(wrapper.container.querySelectorAll('.toast').length).toEqual(8);
                        expect(wrapper.html()).toMatchSnapshot();
                    });
                });
            });

            describe('hideToast()', () => {
                it('should hide a toast by id', async () => {
                    const eventBus = createEventBus();
                    const wrapper = render(ToastContainer, {
                        props: {
                            eventBus,
                            ...props
                        },
                        global: {
                            provide: {
                                ...createTestingInklineOptionsProvide()
                            }
                        }
                    });

                    eventBus.emit('show', { id: 'example' });

                    await waitFor(() => {
                        expect(wrapper.container.querySelectorAll('.toast').length).toEqual(1);
                    });

                    eventBus.emit('hide', { id: 'example' });

                    await waitFor(() => {
                        expect(wrapper.container.querySelectorAll('.toast').length).toEqual(0);
                    });
                });
            });

            describe('hideAllToasts()', () => {
                it('should hide all toasts', async () => {
                    const eventBus = createEventBus();
                    const wrapper = render(ToastContainer, {
                        props: {
                            eventBus,
                            ...props
                        },
                        global: {
                            provide: {
                                ...createTestingInklineOptionsProvide()
                            }
                        }
                    });

                    eventBus.emit('show', { id: 'top-left', position: 'top-left' });
                    eventBus.emit('show', { id: 'top', position: 'top' });
                    eventBus.emit('show', { id: 'top-right', position: 'top-right' });
                    eventBus.emit('show', { id: 'right', position: 'right' });
                    eventBus.emit('show', { id: 'bottom-right', position: 'bottom-right' });
                    eventBus.emit('show', { id: 'bottom', position: 'bottom' });
                    eventBus.emit('show', { id: 'bottom-left', position: 'bottom-left' });
                    eventBus.emit('show', { id: 'left', position: 'left' });

                    await waitFor(() => {
                        expect(wrapper.container.querySelectorAll('.toast').length).toEqual(8);
                    });

                    eventBus.emit('hideAll', {});

                    await waitFor(() => {
                        expect(wrapper.container.querySelectorAll('.toast').length).toEqual(0);
                    });
                });
            });
        });
    });
});
