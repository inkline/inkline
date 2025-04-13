import { ModalService } from '../types';
import { modalService } from '../instances';

export function useModalBuilder(): ModalService {
    return modalService;
}
