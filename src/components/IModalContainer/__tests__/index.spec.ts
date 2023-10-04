import { render } from '@testing-library/vue';
import { IModalContainer } from '@inkline/inkline/components';
import { createInkline, retry } from '@inkline/inkline/__tests__/utils';
import { InklineKey, InklineIconsKey } from '@inkline/inkline';
import { createEventBus } from '@grozav/utils';
import * as inklineIcons from '@inkline/inkline/icons';

describe('Components', () => {
    describe('IModalContainer', () => {
        const props = {};

        it('should be named correctly', () => {
            expect(IModalContainer.name).toEqual('IModalContainer');
        });

        it('should render correctly', () => {
            const wrapper = render(IModalContainer, {
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
            describe('showModal()', () => {
                it('should show a modal', async () => {
                    const eventBus = createEventBus();
                    const wrapper = render(IModalContainer, {
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

                    eventBus.emit('show', {
                        id: 'modal',
                        header: 'Modal Header',
                        body: 'Modal Body',
                        footer: 'Modal Footer'
                    });

                    await retry(() => {
                        expect(wrapper.container.querySelectorAll('.modal').length).toEqual(1);
                        expect(wrapper.html()).toMatchSnapshot();
                    });
                });
            });

            describe('showModal()', () => {
                it('should hide a modal by id', async () => {
                    const eventBus = createEventBus();
                    const wrapper = render(IModalContainer, {
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

                    eventBus.emit('show', {
                        id: 'modal',
                        header: 'Modal Header',
                        body: 'Modal Body',
                        footer: 'Modal Footer'
                    });

                    eventBus.emit('hide', { id: 'modal' });

                    await retry(() => {
                        expect(wrapper.container.querySelectorAll('.modal').length).toEqual(0);
                        expect(wrapper.html()).toMatchSnapshot();
                    });
                });
            });
        });
    });
});
