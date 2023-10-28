import type { ModalService } from '@inkline/inkline/types';
import { modalService } from '@inkline/inkline/services';

export function useModalBuilder(): ModalService {
    return modalService;
}
