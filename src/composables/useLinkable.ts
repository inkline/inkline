import { computed, resolveComponent, Ref } from 'vue';
import { useInkline } from '@inkline/inkline/composables/useInkline';

export function useLinkable(props: {
    to: Ref<string | Record<string, unknown> | undefined>;
    href: Ref<string | undefined>;
    tag: Ref<string>;
}) {
    const inkline = useInkline();

    const isLink = computed(() => {
        return props.to.value || props.href.value;
    });

    const tag = computed<string | any>(() => {
        const routerComponent = inkline?.options?.routerComponent;

        if (props.to.value && routerComponent) {
            return typeof routerComponent === 'string'
                ? resolveComponent(routerComponent)
                : routerComponent;
        } else if (props.href.value) {
            return 'a';
        } else {
            return props.tag.value;
        }
    });

    return { tag, isLink };
}
