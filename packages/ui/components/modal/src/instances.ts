import { createEventBus } from '@inkline/utils';
import { createModalService, createOverlayService } from './services';
import type { ModalEventBusPayload } from './types';

export const modalEventBus = createEventBus<ModalEventBusPayload>();
export const modalService = createModalService(modalEventBus);
export const overlayService = createOverlayService();
