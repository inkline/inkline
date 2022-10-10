import { computed } from 'vue';
import { useInkline } from './inkline';

export interface LinkableProps {
    to: string | Record<string, unknown> | undefined;
    href: string | undefined;
}

export function useLinkable(props: LinkableProps) {
    const inkline = useInkline();

    const routerComponent = computed(() => {
        return inkline?.options?.routerComponent;
    });

    const isRouterLink = computed(() => {
        return Boolean(routerComponent.value && (props.to || props.href));
    });

    // const isComponent = computed(() => {
    //     return isTag.value === routerComponent.value;
    // });

    return { isRouterLink };
}

export const useLinkableProps = {
    tag: {
        type: String,
        default: 'a'
    }
};
