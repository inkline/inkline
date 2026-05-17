import { ToastService } from '../types';
import { toastService } from '../instances';

export function useToast(): ToastService {
    return toastService;
}
