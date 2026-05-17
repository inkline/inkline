import { createEventBus } from '@inkline/utils';
import { createToastService } from './services';
import type { ToastEventBusPayload } from './types';

export const toastEventBus = createEventBus<ToastEventBusPayload>();
export const toastService = createToastService(toastEventBus);
