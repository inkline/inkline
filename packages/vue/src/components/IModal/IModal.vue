<script lang="ts">
import type { PropType } from 'vue';
import { defineComponent, ref, toRef, computed, watch, onMounted, onBeforeUnmount } from 'vue';
import { addClass, removeClass, uid } from '@inkline/utils';
import { OverlayController } from '@inkline/inkline/controllers';
import { useComponentColor, useComponentSize, useClickOutside } from '@inkline/inkline/composables';
import type { StringOrRenderableType } from '@inkline/inkline/types';

const componentName = 'IModal';

export default defineComponent({
    name: componentName,
    inheritAttrs: false,
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
         * @default
         * @name color
         */
        color: {
            type: String,
            default: undefined
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
         * Make the modal cover the entire screen
         * @type Boolean
         * @default false
         * @name fullscreen
         */
        fullscreen: {
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
            default: (): string => {
                return uid('modal');
            }
        },
        /**
         * Determines if the close icon should be visible in the modal header
         * @type Boolean
         * @default false
         * @name dismissible
         */
        dismissible: {
            type: Boolean,
            default: true
        },
        /**
         * The size variant of the modal
         * @type sm | md | lg
         * @default
         * @name sizeMultiplier
         */
        size: {
            type: String,
            default: undefined
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
        },
        /**
         * The header of the modal
         * @type string | VNode | VNode[]
         * @default undefined
         * @name header
         */
        header: {
            type: [String, Object] as PropType<StringOrRenderableType>,
            default: undefined
        },
        /**
         * The icon of the modal
         * @type string | VNode | VNode[]
         * @default undefined
         * @name icon
         */
        icon: {
            type: [String, Object] as PropType<StringOrRenderableType>,
            default: undefined
        },
        /**
         * The body of the modal
         * @type string | VNode | VNode[]
         * @default undefined
         * @name body
         */
        body: {
            type: [String, Object] as PropType<StringOrRenderableType>,
            default: undefined
        },
        /**
         * The footer of the modal
         * @type string | VNode | VNode[]
         * @default undefined
         * @name footer
         */
        footer: {
            type: [String, Object] as PropType<StringOrRenderableType>,
            default: undefined
        }
    },
    emits: [
        /**
         * Event emitted for setting the modelValue
         * @event update:modelValue
         */
        'update:modelValue',
        /**
         * Event emitted when the modal is open
         * @event open
         */
        'open',
        /**
         * Event emitted when the modal is opened and animation is finished
         * @event opened
         */
        'opened',
        /**
         * Event emitted when the modal is closed
         * @event close
         */
        'close',
        /**
         * Event emitted when the modal is closed and animation is finished
         * @event close
         */
        'closed'
    ],
    setup(props, { emit }) {
        const visible = ref(props.modelValue);

        const currentColor = computed(() => props.color);
        const currentSize = computed(() => props.size);
        const { color } = useComponentColor({ componentName, color: currentColor });
        const { size } = useComponentSize({ componentName, size: currentSize });

        const classes = computed(() => ({
            [`-${color.value}`]: true,
            [`-${size.value}`]: true,
            '-disabled': props.disabled,
            '-fullscreen': props.fullscreen
        }));

        const wrapperRef = ref<HTMLElement | null>(null);
        const modalRef = ref<HTMLElement | null>(null);
        const name = toRef(props, 'name');
        const closeOnPressEscape = toRef(props, 'closeOnPressEscape');

        const isVNode = computed(() => ({
            header: typeof props.header === 'object',
            icon: typeof props.icon === 'object',
            body: typeof props.body === 'object',
            footer: typeof props.footer === 'object'
        }));

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
            emit('open');

            OverlayController.open(props.name);

            if (typeof window !== 'undefined') {
                addClass(window.document.body, '-modal');
            }
        }

        function hide(): void {
            if (props.disabled || !visible.value) {
                return;
            }

            visible.value = false;
            emit('update:modelValue', false);
            emit('close');

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

        function onAfterEnter(): void {
            emit('opened');
        }

        function onAfterLeave(): void {
            emit('closed');
        }

        return {
            classes,
            modalRef,
            wrapperRef,
            visible,
            isVNode,
            hide,
            onAfterEnter,
            onAfterLeave
        };
    }
});
</script>

<template>
    <transition name="fade-in-transition">
        <div
            v-show="visible"
            v-bind="$attrs"
            :id="name"
            ref="wrapperRef"
            class="modal-wrapper"
            role="dialog"
            aria-modal="true"
            :aria-hidden="visible ? 'false' : 'true'"
            :name="name"
            :aria-labelledby="`${name}-header`"
        >
            <transition :name="transition" @after-enter="onAfterEnter" @after-leave="onAfterLeave">
                <div v-show="visible" ref="modalRef" class="modal" :class="classes">
                    <div v-if="header || $slots.header" :id="`${name}-header`" class="modal-header">
                        <!-- @slot footer Slot for modal header content -->
                        <slot name="header">
                            <component :is="header" v-if="header && isVNode.header" />
                            <div v-else>{{ header }}</div>
                        </slot>
                        <button
                            v-if="dismissible"
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
                    <div v-if="body || $slots.default" class="modal-body">
                        <div v-if="icon || $slots.icon" class="modal-icon">
                            <slot name="icon">
                                <component :is="icon" v-if="icon && isVNode.icon" />
                                <div v-else>{{ icon }}</div>
                            </slot>
                        </div>
                        <div class="modal-content">
                            <!-- @slot default Slot for modal body content -->
                            <slot>
                                <component :is="body" v-if="body && isVNode.body" />
                                <div v-else>{{ body }}</div>
                            </slot>
                        </div>
                    </div>
                    <div v-if="footer || $slots.footer" class="modal-footer">
                        <!-- @slot footer Slot for modal footer content -->
                        <slot name="footer">
                            <component :is="footer" v-if="footer && isVNode.footer" />
                            <div v-else>{{ footer }}</div>
                        </slot>
                    </div>
                </div>
            </transition>
        </div>
    </transition>
</template>
