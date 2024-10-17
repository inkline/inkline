import { Component, h, markRaw, Ref } from 'vue';
import { computed, resolveComponent } from 'vue';
import { useOptions } from './useOptions';

export function useLinkable(props: {
    to: Ref<string | object | undefined>;
    href: Ref<string | undefined>;
    tag: Ref<string>;
}) {
    const { options } = useOptions();

    const isLink = computed(() => {
        return props.to.value || props.href.value;
    });

    const renderTag = computed<string | Component>(() => {
        if (props.href.value) {
            return 'a';
        } else {
            return props.tag.value;
        }
    });

    const renderComponent = computed(() => {
        const routerComponent = options.value.routerComponent;
        let component: Component;

        if (props.to.value && routerComponent) {
            if (typeof routerComponent === 'string') {
                component = resolveComponent(routerComponent) as Component;
            } else {
                component = routerComponent;
            }
        } else {
            component = ((props, { attrs, slots }) =>
                h(renderTag.value, { ...props, ...attrs }, slots)) satisfies Component;
        }

        return markRaw(component);
    });

    return { renderTag, renderComponent, isLink };
}
