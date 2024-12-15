import { InklineOptionsKey } from '@inkline/types';
import { useInjectStrict } from './useInjectStrict';

export function useOptions() {
    const options = useInjectStrict(InklineOptionsKey);
    return { options };
}
