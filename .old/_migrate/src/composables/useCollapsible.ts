import type { Ref } from 'vue';
import { computed, onBeforeUnmount, onMounted, ref, watch } from 'vue';
import { on, off } from '@inkline/utils';
import { breakpoints } from '@inkline/inkline/constants';

export function useCollapsible(props: {
    collapse: Ref<string | boolean>;
    modelValue: Ref<boolean>;
    emit: (event: 'update:modelValue', ...args: any[]) => void;
}) {
    const open = ref(props.modelValue.value);
    const collapsible = ref(
        typeof props.collapse.value === 'boolean' ? props.collapse.value : false
    );
    const windowWidth = ref(typeof window !== 'undefined' ? window.innerWidth : 0);

    const classes = computed(() => ({
        '-open': open.value,
        '-collapsible': collapsible.value,
        [`-collapse-${props.collapse.value}`]: Boolean(props.collapse.value)
    }));

    watch(
        () => props.modelValue.value,
        (value) => {
            open.value = value;
        }
    );

    onMounted(() => {
        if (typeof window !== 'undefined') {
            on(window as any, 'resize', onWindowResize);

            onWindowResize();
        }
    });

    onBeforeUnmount(() => {
        if (typeof window !== 'undefined') {
            off(window as any, 'resize', onWindowResize);
        }
    });

    function setCollapsible() {
        if (props.collapse.value === true || props.collapse.value === false) {
            collapsible.value = props.collapse.value;
        } else {
            collapsible.value = windowWidth.value <= breakpoints[props.collapse.value][1];
        }
    }

    function setOpen(value: boolean) {
        open.value = value;
        props.emit('update:modelValue', open.value);
    }

    function toggleOpen() {
        open.value = !open.value;
        props.emit('update:modelValue', open.value);
    }

    function onWindowResize() {
        if (typeof window === 'undefined') {
            return;
        }

        if (typeof props.collapse.value !== 'boolean') {
            const currentWindowWidth = window.innerWidth;

            if (
                windowWidth.value <= breakpoints[props.collapse.value][1] &&
                currentWindowWidth > breakpoints[props.collapse.value][1]
            ) {
                setOpen(false);
            }

            windowWidth.value = window.innerWidth;
        }

        setCollapsible();
    }

    return { open, collapsible, classes, setOpen, toggleOpen };
}
