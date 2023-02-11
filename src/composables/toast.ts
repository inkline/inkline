import { inject } from 'vue';
import { ToastKey, ToastService } from '@inkline/inkline/plugins';

export function useToast() {
    return inject(ToastKey) as ToastService;
}
