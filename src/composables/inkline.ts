import { inject } from 'vue';
import { InklineGlobalOptions } from '../plugin';

export function useInkline() {
    return inject('inkline') as InklineGlobalOptions;
}
