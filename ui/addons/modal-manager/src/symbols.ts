import { InjectionKey } from 'vue';
import { modalService } from '@inkline/component-modal';

export const InklineModalKey: InjectionKey<typeof modalService> =
    'InklineModal' as unknown as symbol;
