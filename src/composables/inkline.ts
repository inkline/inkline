import { inject } from 'vue';
import { InklineService, InklineKey } from '@inkline/inkline/plugin';

export function useInkline() {
    return inject(InklineKey) as InklineService;
}
