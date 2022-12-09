import { inject } from 'vue';
import { InklineGlobalOptions, InklineKey } from '../plugin';

export function useInkline() {
    return inject(InklineKey) as InklineGlobalOptions;
}
