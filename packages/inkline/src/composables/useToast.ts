import { toastService } from '@inkline/inkline/constants';
import type { ToastService } from '@inkline/inkline/types';

export function useToast(): ToastService {
    return toastService;
}
