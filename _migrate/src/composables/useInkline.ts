import { InklineKey, useInjectStrict } from '@inkline/inkline';

export function useInkline() {
    return useInjectStrict(InklineKey);
}
