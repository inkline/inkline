import { inject } from 'vue';
import { InklineKey } from '@inkline/inkline/constants';
import type { InklineService } from '@inkline/inkline/plugin';

export function useInkline() {
    return inject(InklineKey) as InklineService;
}
