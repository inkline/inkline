import { ref, selector, usePadding } from '@inkline/config';

export function useTheme() {
    const { padding } = usePadding();

    selector('.alert', {
        padding: ref(padding)
    });
}
