import { inject } from 'vue';
import { InklineModalKey } from '@inkline/inkline';
import type { ModalService } from '@inkline/inkline';

export function useModalBuilder() {
    return inject(InklineModalKey) as ModalService;
}
