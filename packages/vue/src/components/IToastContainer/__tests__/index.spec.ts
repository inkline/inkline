import { render } from '@testing-library/vue';
import { IToastContainer } from '@inkline/inkline/components';
import { createInkline, retry } from '@inkline/inkline/__tests__/utils';
import { InklineKey, InklineIconsKey } from '@inkline/inkline';
import { createEventBus } from '@inkline/utils';
import * as inklineIcons from '@inkline/inkline/icons';

describe('Components', () => {
    describe('IToastContainer', () => {
        const props = {};

        it('should be named correctly', () => {
            expect(IToastContainer.name).toEqual('IToastContainer');
        });

        it('should render correctly', () => {
            const wrapper = render(IToastContainer, {
                props,
                global: {
                    provide: {
                        [InklineKey as symbol]: createInkline(),
                        [InklineIconsKey as symbol]: inklineIcons
                    }
                }
            });
            expect(wrapper.html()).toMatchSnapshot();
        });

        describe('methods', () => {
            describe('showToast()', () => {
                it('should show a toast in every container position', async () => {
                    const eventBus = createEventBus();
                    const wrapper = render(IToastContainer, {
                        props: {
                            eventBus,
                            ...props
                        },
                        global: {
                            provide: {
                                [InklineKey as symbol]: createInkline(),
                                [InklineIconsKey as symbol]: inklineIcons
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

                    await retry(() => {
                        expect(wrapper.container.querySelectorAll('.toast').length).toEqual(8);
                        expect(wrapper.html()).toMatchSnapshot();
                    });
                });
            });

            describe('hideToast()', () => {
                it('should hide a toast by id', async () => {
                    const eventBus = createEventBus();
                    const wrapper = render(IToastContainer, {
                        props: {
                            eventBus,
                            ...props
                        },
                        global: {
                            provide: {
                                [InklineKey as symbol]: createInkline(),
                                [InklineIconsKey as symbol]: inklineIcons
                            }
                        }
                    });

                    eventBus.emit('show', { id: 'example' });

                    await retry(() => {
                        expect(wrapper.container.querySelectorAll('.toast').length).toEqual(1);
                    });

                    eventBus.emit('hide', { id: 'example' });

                    await retry(() => {
                        expect(wrapper.container.querySelectorAll('.toast').length).toEqual(0);
                    });
                });
            });

            describe('hideAllToasts()', () => {
                it('should hide all toasts', async () => {
                    const eventBus = createEventBus();
                    const wrapper = render(IToastContainer, {
                        props: {
                            eventBus,
                            ...props
                        },
                        global: {
                            provide: {
                                [InklineKey as symbol]: createInkline(),
                                [InklineIconsKey as symbol]: inklineIcons
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

                    await retry(() => {
                        expect(wrapper.container.querySelectorAll('.toast').length).toEqual(8);
                    });

                    eventBus.emit('hideAll', {});

                    await retry(() => {
                        expect(wrapper.container.querySelectorAll('.toast').length).toEqual(0);
                    });
                });
            });
        });
    });
});
