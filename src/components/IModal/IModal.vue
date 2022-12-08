<script lang="ts">
import { defineComponent, ref, toRef, computed, watch, onMounted, onBeforeUnmount } from 'vue';
import { addClass, removeClass, uid } from '@grozav/utils';
import { OverlayController } from '@inkline/inkline/controllers';
import { useComponentColor, useComponentSize, useClickOutside } from '@inkline/inkline/composables';

const componentName = 'IModal';

export default defineComponent({
    name: componentName,
    props: {
        /**
         * Determines if the modal should close when pressing escape
         * @type Boolean
         * @default true
         * @name closeOnPressEscape
         */
        closeOnPressEscape: {
            type: Boolean,
            default: true
        },
        /**
         * The aria-label attribute of the close button
         * @type String
         * @default Close
         * @name closeAriaLabel
         */
        closeAriaLabel: {
            type: String,
            default: 'Close'
        },
        /**
         * The color variant of the modal
         * @type primary | success | light | dark | info | success | warning | danger
         * @default light
         * @name color
         */
        color: {
            type: String,
            default: ''
        },
        /**
         * The disabled state of the modal
         * @type Boolean
         * @default false
         * @name disabled
         */
        disabled: {
            type: Boolean,
            default: false
        },
        /**
         * Determines if the modal should close when clicking the overlay
         * @type Boolean
         * @default true
         * @name hideOnClickOutside
         */
        hideOnClickOutside: {
            type: Boolean,
            default: true
        },
        /**
         * The identifier of the modal
         * @type String
         * @default uid()
         * @name name
         */
        name: {
            type: String,
            default(): string {
                return uid('modal');
            }
        },
        /**
         * Determines if the close icon should be visible in the modal header
         * @type Boolean
         * @default false
         * @name showClose
         */
        showClose: {
            type: Boolean,
            default: true
        },
        /**
         * The size variant of the modal
         * @type sm | md | lg
         * @default md
         * @name size
         */
        size: {
            type: String,
            default: ''
        },
        /**
         * Used to determine if modal is visible or not
         * @type Boolean
         * @default false
         * @name modelValue
         */
        modelValue: {
            type: Boolean,
            default: false
        },
        /**
         * The modal opening and closing animation
         * @type fade-in-transition | fade-in-linear-transition | zoom-in-top-transition | zoom-in-bottom-transition | zoom-in-center-transition | zoom-in-left-transition | zoom-in-right-transition
         * @default zoom-in-center-transition
         * @name transition
         */
        transition: {
            type: String,
            default: 'zoom-in-center-transition'
        }
    },
    emits: [
        /**
         * Event emitted for setting the modelValue
         * @event update:modelValue
         */
        'update:modelValue'
    ],
    setup(props, { emit }) {
        const visible = ref(props.modelValue);

        const currentColor = computed(() => props.color);
        const currentSize = computed(() => props.size);
        const { color } = useComponentColor({ componentName, currentColor });
        const { size } = useComponentSize({ componentName, currentSize });

        const classes = computed(() => ({
            [`-${color.value}`]: true,
            [`-${size.value}`]: true,
            '-disabled': props.disabled
        }));

        const wrapperRef = ref<HTMLElement | null>(null);
        const modalRef = ref<HTMLElement | null>(null);
        const name = toRef(props, 'name');
        const closeOnPressEscape = toRef(props, 'closeOnPressEscape');

        watch(
            () => props.modelValue,
            (value) => {
                if (value) {
                    show();
                } else {
                    hide();
                }
            }
        );

        onMounted(() => {
            OverlayController.register({
                name,
                elementRef: wrapperRef,
                closeOnPressEscape,
                hide
            });
        });

        onBeforeUnmount(() => {
            OverlayController.unregister({
                name,
                elementRef: wrapperRef,
                closeOnPressEscape,
                hide
            });
        });

        useClickOutside({
            elementRef: modalRef,
            fn: onClickOutside
        });

        function show(): void {
            if (props.disabled) {
                return;
            }

            visible.value = true;
            emit('update:modelValue', true);

            OverlayController.open(props.name);

            if (typeof window !== 'undefined') {
                addClass(window.document.body, '-modal');
            }
        }

        function hide(): void {
            if (props.disabled) {
                return;
            }

            visible.value = false;
            emit('update:modelValue', false);

            OverlayController.close(props.name);

            if (typeof window !== 'undefined') {
                removeClass(window.document.body, '-modal');
            }
        }

        function onClickOutside(): void {
            if (!props.hideOnClickOutside) {
                return;
            }

            hide();
        }

        return {
            classes,
            modalRef,
            wrapperRef,
            visible,
            hide
        };
    }
});
</script>

<template>
    <transition name="fade-in-transition">
        <div
            v-show="visible"
            :id="name"
            ref="wrapperRef"
            class="modal-wrapper"
            role="dialog"
            aria-modal="true"
            :aria-hidden="visible ? 'false' : 'true'"
            :class="classes"
            :name="name"
            :aria-labelledby="`${name}-header`"
        >
            <transition :name="transition">
                <div v-show="visible" ref="modalRef" class="modal">
                    <div v-if="$slots.header" :id="`${name}-header`" class="modal-header">
                        <!-- @slot footer Slot for modal header content -->
                        <slot name="header" />
                        <button
                            v-if="showClose"
                            class="close"
                            aria-hidden="true"
                            :aria-label="closeAriaLabel"
                            @click="hide"
                        >
                            <!-- @slot close Close icon slot -->
                            <slot name="close">
                                <i class="icon" />
                            </slot>
                        </button>
                    </div>
                    <div v-if="$slots.default" class="modal-body">
                        <!-- @slot default Slot for modal body content -->
                        <slot />
                    </div>
                    <div v-if="$slots.footer" class="modal-footer">
                        <!-- @slot footer Slot for modal footer content -->
                        <slot name="footer" />
                    </div>
                </div>
            </transition>
        </div>
    </transition>
</template>
