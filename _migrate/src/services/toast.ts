import type { EventBus } from '@inkline/utils';
import type { ToastService } from '@inkline/inkline/types';

export function createToastService(eventBus: EventBus): ToastService {
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
