import { fireEvent, render } from '@testing-library/vue';
import { IToastContainer } from '@inkline/inkline/components';
import { createInkline, Placeholder } from '@inkline/inkline/__mocks__';
import { InklineKey } from '@inkline/inkline/plugin';
import { createEventBus } from '@grozav/utils';

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
                        [InklineKey as symbol]: createInkline()
                    }
                }
            });
            expect(wrapper.html()).toMatchSnapshot();
        });

        describe('methods', () => {
            describe('showToast()', () => {
                it('should hide the alert when clicking the dismiss button', async () => {
                    const eventBus = createEventBus();
                    const wrapper = render(IToastContainer, {
                        props: {
                            eventBus,
                            ...props
                        },
                        global: {
                            provide: {
                                [InklineKey as symbol]: createInkline()
                            }
                        }
                    });

                    eventBus.emit('show', { position: 'top-left' });
                    eventBus.emit('show', { position: 'top' });
                    eventBus.emit('show', { position: 'top-right' });
                    eventBus.emit('show', { position: 'right' });
                    eventBus.emit('show', { position: 'bottom-right' });
                    eventBus.emit('show', { position: 'bottom' });
                    eventBus.emit('show', { position: 'bottom-left' });
                    eventBus.emit('show', { position: 'left' });

                    expect(wrapper.container).toMatchSnapshot();
                });
            });
        });
    });
});
