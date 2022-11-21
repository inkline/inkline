import { computed, onBeforeUnmount, onMounted, ref, Ref, watch } from 'vue';
import { on, off } from '@grozav/utils';
import { breakpoints } from '@inkline/inkline/constants';

export function useCollapsible(props: {
    collapse: Ref<string | boolean>;
    modelValue: Ref<boolean>;
    emit: (event: 'update:modelValue', ...args: any[]) => void;
}) {
    const open = ref(props.modelValue.value);
    const windowWidth = ref(typeof window !== 'undefined' ? window.innerWidth : 0);

    const collapsible = computed(() => {
        if (props.collapse.value === true || props.collapse.value === false) {
            return props.collapse.value;
        }

        return windowWidth.value <= breakpoints[props.collapse.value][1];
    });

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

    function setOpen(value: boolean) {
        open.value = value;
        props.emit('update:modelValue', open.value);
    }

    function toggleOpen() {
        open.value = !open.value;
        props.emit('update:modelValue', open.value);
    }

    function onWindowResize() {
        if (
            props.collapse.value === true ||
            props.collapse.value === false ||
            typeof window === 'undefined'
        ) {
            return;
        }

        const currentWindowWidth = window.innerWidth;

        if (
            windowWidth.value <= breakpoints[props.collapse.value][1] &&
            currentWindowWidth > breakpoints[props.collapse.value][1]
        ) {
            setOpen(false);
        }

        windowWidth.value = window.innerWidth;
    }

    return { open, collapsible, classes, setOpen, toggleOpen };
}

// export default defineComponent({
//     // props: {
//     //     collapse: {
//     //         type: [String, Boolean],
//     //         default: 'md'
//     //     },
//     //     modelValue: {
//     //         type: Boolean,
//     //         default: false
//     //     }
//     // },
//     // emits: ['update:modelValue'],
//     // data () {
//     //     return {
//     //         open: this.modelValue,
//     //         windowWidth: typeof window !== 'undefined' ? window.innerWidth : 0
//     //     };
//     // },
//     computed: {
//         // collapsibleClasses(): Classes {
//         //     return {
//         //         '-open': this.open,
//         //         '-collapsible': this.collapsible,
//         //         [`-collapse-${this.collapse}`]: Boolean(this.collapse)
//         //     };
//         // }
//     },
//     watch: {
//
//     },
//     created() {
//
//     },
//     // beforeUnmount() {
//     //     if (typeof window !== 'undefined') {
//     //         off(window as any, 'resize', this.onWindowResize);
//     //     }
//     // },
//     methods: {
//
//     }
// });
