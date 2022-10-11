import { computed } from 'vue';
import { useInkline } from './inkline';

export interface LinkableProps {
    to: string | Record<string, unknown> | undefined;
    href: string | undefined;
    tag: string;
}

export function useLinkable(props: LinkableProps) {
    const inkline = useInkline();

    const tag = computed((): string => {
        if (props.to) {
            return inkline?.options?.routerComponent;
        } else {
            if (props.href) {
                return 'a';
            } else {
                return props.tag;
            }
        }
    });

    return { tag };
}
