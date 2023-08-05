import { inject } from 'vue';
import { InklineKey } from '@inkline/inkline';
import type { InklineService } from '@inkline/inkline/plugin';

export function useInkline() {
    return inject(InklineKey) as InklineService;
}
