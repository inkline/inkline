import { computed } from 'vue';
import { useInkline } from './inkline';

export interface LinkableProps {
    to: string | Record<string, unknown> | undefined;
    href: string | undefined;
    tag?: string;
}

export function useLinkable(props: LinkableProps) {
    const inkline = useInkline();

    const routerComponent = computed(() => {
        return inkline?.options?.routerComponent;
    });

    const isRouterLink = computed(() => {
        return Boolean(routerComponent.value && (props.to || props.href));
    });

    const tag = computed((): string => {
        return isRouterLink.value ? tag.value : 'a';
    });

    // const isComponent = computed(() => {
    //     return isTag.value === routerComponent.value;
    // });

    return { isRouterLink, tag };
}
