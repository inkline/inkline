import { inject } from 'vue';
import { InklineGlobalOptions, InklineKey } from '@inkline/inkline/plugin';

export function useInkline() {
    return inject(InklineKey) as InklineGlobalOptions;
}
