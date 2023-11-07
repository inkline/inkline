import type { EventBus } from '@grozav/utils';
import { createEventBus } from '@grozav/utils';
import { createModalService, createToastService } from '@inkline/inkline/services';

export const modalEventBus: EventBus = createEventBus();
export const modalService = createModalService(modalEventBus);

export const toastEventBus: EventBus = createEventBus();
export const toastService = createToastService(toastEventBus);
