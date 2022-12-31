import { inject } from 'vue';
import { InklineGlobal, InklineKey } from '@inkline/inkline/plugin';

export function useInkline() {
    return inject(InklineKey) as InklineGlobal;
}
