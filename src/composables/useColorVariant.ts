import { computed, inject, ref, Ref } from '@inkline/paper';
import { inklineSymbol } from '@inkline/inkline/plugin';

/**
 * Get color variant based on global inkline colorMode.
 * If a color prop is present, return the prop value.
 *
 * @param colorProp
 */
export function useColorVariant (colorProp?: string) {
    const inkline = inject(inklineSymbol);

    const getColor = () => {
        if (!colorProp && inkline) {
            if (inkline.value.options.colorMode === 'system') {
                return typeof window !== 'undefined' && window.matchMedia('(prefers-color-scheme: dark)').matches
                    ? 'dark'
                    : 'light';
            } else {
                return inkline.value.options.colorMode;
            }
        }

        return colorProp;
    };

    const color: Ref<string> = computed(
        () => getColor(),
        [
            inkline,
            inkline?.value.options.colorMode,
            colorProp
        ]
    );

    return { color };
}
