import type { EventBus } from '@grozav/utils';
import { createEventBus } from '@grozav/utils';
import type { ToastService } from '@inkline/inkline/types';

export const toastEventBus: EventBus = createEventBus();

export function createToastService(eventBus: EventBus = toastEventBus): ToastService {
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

export const toastService = createToastService();
