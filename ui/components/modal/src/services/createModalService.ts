import type { EventBus } from '@inkline/utils';
import type { ModalService, ModalEventBusPayload } from '../types';

export function createModalService(eventBus: EventBus<ModalEventBusPayload>): ModalService {
    return {
        show: (options) => {
            eventBus.emit('show', options);
        },
        hide: (options) => {
            eventBus.emit('hide', options);
        },
        hideAll: () => {
            eventBus.emit('hideAll');
        }
    };
}
