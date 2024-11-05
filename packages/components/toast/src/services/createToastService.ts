import type { EventBus } from '@inkline/utils';
import type { ToastEventBusPayload, ToastService } from '../types';

export function createToastService(eventBus: EventBus<ToastEventBusPayload>): ToastService {
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
