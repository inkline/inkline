import { InklineOptionsKey, VariantProps } from '@inkline/types';
import { useInjectStrict } from './useInjectStrict';

export function useOptions() {
    const options = useInjectStrict(InklineOptionsKey);

    function addThemeVariant(
        name: string,
        variant: VariantProps,
        variantOptions: { default?: boolean } = {}
    ) {
        options.value.theme.variants ||= {};
        options.value.theme.variants[name] = variantOptions.default
            ? {
                  ...variant,
                  ...options.value.theme.variants[name]
              }
            : {
                  ...options.value.theme.variants[name],
                  ...variant
              };
    }

    return { options, addThemeVariant };
}
