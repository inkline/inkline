import type { EventBus } from '@grozav/utils';
import type { ModalService } from '@inkline/inkline';

export function createModalService(eventBus: EventBus): ModalService {
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
