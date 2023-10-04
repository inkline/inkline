import { inject } from 'vue';
import { InklineModalKey } from '@inkline/inkline/constants';
import type { ModalService } from '@inkline/inkline/plugins';

export function useModalBuilder() {
    return inject(InklineModalKey) as ModalService;
}
