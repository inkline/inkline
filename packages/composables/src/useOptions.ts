import { InklineOptionsKey } from '@inkline/vue';
import { useInjectStrict } from './useInjectStrict';

export function useOptions() {
    const options = useInjectStrict(InklineOptionsKey);
    return { options };
}
