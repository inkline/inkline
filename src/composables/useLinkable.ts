import { computed, inject } from '@inkline/paper';
import { inklineSymbol } from '@inkline/inkline/plugin';

/**
 * Returns node type to be rendered for linkable components based on their props.
 * - If `to` prop is present, treat it as a router link
 * - If `href` prop is present, treat it as an anchor
 *
 * @param props
 */
export function useLinkable (props: Record<string, any>) {
    const inkline = inject(inklineSymbol);
    const routerComponent = computed(
        () => props.to
            ? (inkline?.value.options.routerComponent || 'a')
            : props.href
                ? 'a'
                : props.tag,
        [
            inkline?.value.options.routerComponent,
            props.to,
            props.href,
            props.tag
        ]);

    return {
        Component: routerComponent.value
    };
}
