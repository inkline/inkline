import { toastService } from '@inkline/inkline/services';
import type { ToastService } from '@inkline/inkline/types';

export function useToast(): ToastService {
    return toastService;
}
