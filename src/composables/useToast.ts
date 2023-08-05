import { inject } from 'vue';
import { InklineToastKey } from '@inkline/inkline';
import type { ToastService } from '@inkline/inkline/plugins';

export function useToast() {
    return inject(InklineToastKey) as ToastService;
}
