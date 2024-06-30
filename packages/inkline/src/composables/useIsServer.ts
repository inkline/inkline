import { ref } from 'vue';

export function useIsServer() {
    const isServer = ref(typeof window === 'undefined');

    return { isServer };
}
