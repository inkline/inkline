import type { EventBus } from '@grozav/utils';
import { createEventBus } from '@grozav/utils';
import type { ModalService } from '@inkline/inkline';

export const modalEventBus: EventBus = createEventBus();

export function createModalService(eventBus: EventBus = modalEventBus): ModalService {
    return {
        show: (options) => {
            eventBus.emit('show', options);
        },
        hide: (options) => {
            eventBus.emit('hide', options);
        },
        hideAll: () => {
            eventBus.emit('hideAll', {});
        }
    };
}

export const modalService = createModalService();
