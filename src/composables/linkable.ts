import { computed, Ref } from "vue";
import { useInkline } from "@inkline/inkline/composables";

export function useLinkable(props: {
    to: Ref<string | Record<string, unknown> | undefined>;
    href: Ref<string | undefined>;
    tag: Ref<string>;
}) {
    const inkline = useInkline();

    const tag = computed((): string => {
        const routerComponent = inkline?.options?.routerComponent;

        if (props.to.value && routerComponent) {
            return routerComponent;
        } else {
            if (props.href.value) {
                return "a";
            } else {
                return props.tag.value;
            }
        }
    });

    return { tag };
}
