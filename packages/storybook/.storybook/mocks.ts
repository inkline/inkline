import { computed, defineComponent, h, PropType } from 'vue';

export const RouterLink = defineComponent({
    props: {
        to: {
            type: [String, Object] as PropType<string | { name: string; path: string }>
        },
        href: {
            type: String
        }
    },
    setup(props, { slots }) {
        const href = computed(() => {
            if (props.to) {
                if (typeof props.to === 'string') {
                    return props.to;
                }

                return props.to.name ? `/${props.to.name.replace('-', '/')}` : props.to.path;
            }

            return props.href;
        });

        function onClick(event: MouseEvent) {
            event.preventDefault();
        }

        return () => h('a', { href: href.value, onClick }, slots.default?.());
    }
});
