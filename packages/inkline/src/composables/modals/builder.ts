import type { ModalService } from '@inkline/inkline/types';
import { modalService } from '@inkline/inkline/constants';

export function useModalBuilder(): ModalService {
    return modalService;
}
