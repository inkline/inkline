import { render } from '@testing-library/vue';
import { ModalContainer } from '@inkline/inkline/components';
import { retry } from '@inkline/inkline/__tests__/utils';
import { InklineIconsKey } from '@inkline/inkline';
import { createEventBus } from '@inkline/utils';
import * as inklineIcons from '@inkline/inkline/icons';
import { createTestingInklineOptionsProvide } from '@inkline/test-utils';

describe('Components', () => {
    describe('ModalContainer', () => {
        const props = {};

        it('should be named correctly', () => {
            expect(ModalContainer.name).toEqual('ModalContainer');
        });

        it('should render correctly', () => {
            const wrapper = render(ModalContainer, {
                props,
                global: {
                    provide: {
                        ...createTestingInklineOptionsProvide(),
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
                    const wrapper = render(ModalContainer, {
                        props: {
                            eventBus,
                            ...props
                        },
                        global: {
                            provide: {
                                ...createTestingInklineOptionsProvide(),
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
                    const wrapper = render(ModalContainer, {
                        props: {
                            eventBus,
                            ...props
                        },
                        global: {
                            provide: {
                                ...createTestingInklineOptionsProvide(),
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
                    });
                    expect(wrapper.html()).toMatchSnapshot();
                });
            });
        });
    });
});
