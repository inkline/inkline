import { InjectionKey } from 'vue';
import { toastService } from '@inkline/component-toast';

export const InklineToastKey: InjectionKey<typeof toastService> =
    'InklineToast' as unknown as symbol;
