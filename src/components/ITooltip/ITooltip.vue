<script lang="ts" setup>
import {toRef, PropType, ref, computed} from 'vue';
import { uid } from '@grozav/utils';
import {PopupEvent, usePopupControl} from "@inkline/inkline/composables/popup";
import {useComponentColor, useComponentSize} from "@inkline/inkline/composables";
import {Placement} from "@floating-ui/dom";

const componentName = 'ITooltip';

// export default defineComponent({
//     name: componentName,
//     directives: {
//         ClickOutside
//     },
//     mixins: [PopupMixin, PopupControlsMixin],
//     props: ,
//     computed: {
//         computedColor (): string | undefined {
//             return computedColorValue(componentName, this.color);
//         },
//         computedSize (): string | undefined {
//             return computedSizeValue(componentName, this.size);
//         },
//         classes (): Classes {
//             return {
//                 [`-${this.computedColor}`]: Boolean(this.computedColor),
//                 [`-${this.computedSize}`]: Boolean(this.computedSize)
//             };
//         }
//     },
//     methods: {
//         onEscape () {
//             this.visible = false;
//             this.$emit('update:modelValue', false);
//         },
//         handleClickOutside () {
//             this.visible = false;
//             this.$emit('update:modelValue', false);
//             this.onClickOutside();
//         }
//     }
// });

const props = defineProps({
    /**
     * The color variant of the tooltip
     * @name color
     * @type light | dark
     * @default light
     */
    color: {
        type: String,
        default: ''
    },
    /**
     * The disabled state of the tooltip
     * @name disabled
     * @type Boolean
     * @default false
     */
    disabled: {
        type: Boolean,
        default: false
    },
    /**
     * Used to manually control the visibility of the tooltip
     * @name modelValue
     * @type Boolean
     * @default undefined
     */
    modelValue: {
        type: Boolean,
        default: undefined
    },
    /**
     * The identifier of the tooltip
     * @name name
     * @type String
     * @default uid()
     */
    name: {
        type: String,
        default (): string {
            return uid('tooltip');
        }
    },
    /**
     * Displays an arrow on the tooltip pointing to the trigger element
     * @name arrow
     * @type Boolean
     * @default true
     */
    arrow: {
        type: Boolean,
        default: true
    },
    /**
     * The placement of the tooltip
     * @name placement
     * @type top | top-start | top-end | bottom | bottom-start | bottom-end | left | left-start | left-end | right | right-start | right-end
     * @default false
     */
    placement: {
        type: String as PropType<Placement>,
        default: 'top'
    },
    /**
     * The events used to trigger the tooltip
     * @name events
     * @type hover | focus | click | manual
     * @default [hover, focus]
     */
    events: {
        type: [String, Array] as PropType<PopupEvent | PopupEvent[]>,
        default: (): string[] => ['hover', 'focus']
    },
    /**
     * The offset of the tooltip relative to the trigger element
     * @name offset
     * @type Number
     * @default 6
     */
    offset: {
        type: Number,
        default: 6
    },
    /**
     * Determines whether hover state should be transferred from trigger to popup
     * @name interactable
     * @type Boolean
     * @default false
     */
    interactable: {
        type: Boolean,
        default: false
    },
    /**
     * Used to override the popper.js options used for creating the tooltip
     * @name popperOptions
     * @type Object
     * @default {}
     */
    popperOptions: {
        type: Object,
        default: (): any => ({})
    },
    /**
     * The size variant of the tooltip
     * @name size
     * @type sm | md | lg
     * @default md
     */
    size: {
        type: String,
        default: ''
    },
    /**
     * Delay in milliseconds before the tooltip is hidden on hover
     * @name size
     * @type sm | md | lg
     * @default md
     */
    hoverHideDelay: {
        type: Number,
        default: 300
    }
});

const emit = defineEmits([
    /**
     * Event emitted for setting the modelValue
     * @event update:modelValue
     */
    'update:modelValue',
    /**
     * Event emitted when clicking outside the tooltip
     * @event click:outside
     */
    'click:outside'
]);

const triggerRef = ref<HTMLElement | null>(null);
const popupRef = ref<HTMLElement | null>(null);
const arrowRef = ref<HTMLElement | null>(null);

const currentColor = computed(() => props.color);
const currentSize = computed(() => props.size);
const { color } = useComponentColor({ componentName, currentColor });
const { size } = useComponentSize({ componentName, currentSize });

const disabled = toRef(props, 'disabled');
const modelValue = toRef(props, 'modelValue');
const events = toRef(props, 'events');
const offset = toRef(props, 'offset');
const placement = toRef(props, 'placement');
const interactable = toRef(props, 'interactable');
const hoverHideDelay = toRef(props, 'hoverHideDelay');

const { visible, hide, destroyPopup } = usePopupControl({
    triggerRef,
    popupRef,
    arrowRef,
    disabled,
    modelValue,
    events,
    offset,
    placement,
    interactable,
    hoverHideDelay,
    emit
});

const classes = computed(() => {
    return {
        [`-${color.value}`]: true,
        [`-${size.value}`]: true,
    };
});

function onClickOutside() {}
function onEscape() {
    hide();
}

function onChange(value: boolean) {
    emit('update:modelValue', value);
}
</script>

<template>
    <div
        :id="name"
        ref="wrapper"
        class="tooltip-wrapper"
        :class="classes"
        @keyup.esc="onEscape"
    >
        <!-- v-click-outside="onClickOutside" -->
        <div
            ref="triggerRef"
            class="tooltip-trigger"
            :aria-describedby="`${name}-popup`"
            :aria-disabled="disabled ? 'true' : null"
            :aria-expanded="visible ? 'true' : 'false'"
        >
            <!-- @slot default Slot for tooltip trigger -->
            <slot />
        </div>

        <transition name="zoom-in-top-transition" @after-leave="destroyPopup">
            <div
                v-show="visible"
                :id="`${name}-popup`"
                ref="popupRef"
                class="tooltip"
                role="tooltip"
                aria-live="polite"
                :aria-hidden="visible ? 'false' : 'true'"
            >
                <span v-if="props.arrow" ref="arrowRef" class="arrow" />
                <!-- @slot body Slot for tooltip body content -->
                <slot name="body" />
            </div>
        </transition>
    </div>
</template>
