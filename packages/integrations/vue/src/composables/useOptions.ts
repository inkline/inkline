import { InklineOptionsKey } from '../constants';
import { inject } from 'vue';

export function useOptions() {
    const options = inject(InklineOptionsKey);
    if (!options) {
        throw new Error('Inkline options are not provided');
    }

    return { options };
}
