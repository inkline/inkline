import { $inkline } from '@inkline/inkline/plugin';

export function colorVariantClass (colorClass?: string): string {
    console.log
    if (!colorClass && $inkline.prototype) {
        if ($inkline.prototype.options.value.colorMode === 'system') {
            colorClass = typeof window !== 'undefined' && window.matchMedia('(prefers-color-scheme: dark)').matches
                ? 'dark'
                : 'light';
        } else {
            colorClass = $inkline.prototype.options.value.colorMode;
        }
    }

    return 'light';
}
