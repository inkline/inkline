<script lang="ts">
import type { PropType } from 'vue';
import {
    defineComponent,
    ref,
    toRef,
    computed,
    provide,
    watch,
    onMounted,
    onBeforeUnmount
} from 'vue';
import { addClass, removeClass, uid } from '@inkline/utils';
import { useComponentColor, useComponentSize, useClickOutside } from '@inkline/composables';
import type { Renderable } from '@inkline/types';
import { ModalKey } from '@inkline/types';
import { overlayService } from '../../instances';

const componentName = 'Modal';

export default defineComponent({
    name: componentName,
    inheritAttrs: false,
    props: {
        /**
         * Determines if the modal should close when pressing escape
         * @param {boolean} closeOnPressEscape
         * @default true
         */
        closeOnPressEscape: {
            type: Boolean,
            default: true
        },
        /**
         * The color variant of the modal
         * @param {'primary' | 'secondary' | 'light' | 'dark' | 'info' | 'success' | 'warning' | 'danger'} color
         * @default
         */
        color: {
            type: String,
            default: undefined
        },
        /**
         * The disabled state of the modal
         * @param {boolean} disabled
         * @default false
         */
        disabled: {
            type: Boolean,
            default: false
        },
        /**
         * Make the modal cover the entire screen
         * @param {boolean} fullscreen
         * @default false
         */
        fullscreen: {
            type: Boolean,
            default: false
        },
        /**
         * Determines if the modal should close when clicking the overlay
         * @param {boolean} hideOnClickOutside
         * @default true
         */
        hideOnClickOutside: {
            type: Boolean,
            default: true
        },
        /**
         * The identifier of the modal
         * @param {string} name
         * @default uid()
         */
        name: {
            type: String,
            default: (): string => {
                return uid('modal');
            }
        },
        /**
         * Determines if the close icon should be visible in the modal header
         * @param {boolean} dismissible
         * @default false
         */
        dismissible: {
            type: Boolean,
            default: true
        },
        /**
         * The size variant of the modal
         * @param {'sm' | 'md' | 'lg'} size
         * @default
         */
        size: {
            type: String,
            default: undefined
        },
        /**
         * Used to determine if modal is visible or not
         * @param {boolean} modelValue
         * @default false
         */
        modelValue: {
            type: Boolean,
            default: false
        },
        /**
         * The modal opening and closing animation
         * @param {'fade-in-transition' | 'fade-in-linear-transition' | 'zoom-in-top-transition' | 'zoom-in-bottom-transition' | 'zoom-in-center-transition' | 'zoom-in-left-transition' | 'zoom-in-right-transition'} transition
         * @default zoom-in-center-transition
         */
        transition: {
            type: String,
            default: 'zoom-in-center-transition'
        },
        /**
         * Teleport the modal to the modal container
         * @param {boolean} teleport
         * @default false
         */
        teleport: {
            type: Boolean,
            default: true
        },
        /**
         * The content of the modal
         * @param {string | VNode | VNode[]} content
         * @default undefined
         */
        content: {
            type: [String, Object] as PropType<Renderable>,
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

        const rawColor = toRef(props, 'color');
        const rawSize = toRef(props, 'size');
        const { color } = useComponentColor(componentName, rawColor);
        const { size } = useComponentSize(componentName, rawSize);

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

        const isContentVNode = computed(() => typeof props.content === 'object');

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
            overlayService.register({
                name,
                elementRef: wrapperRef,
                closeOnPressEscape,
                hide
            });
        });

        onBeforeUnmount(() => {
            overlayService.unregister({
                name,
                elementRef: wrapperRef,
                closeOnPressEscape,
                hide
            });
        });

        const removeOnClickOutsideEventBindings = useClickOutside(modalRef, onClickOutside);

        function show(): void {
            if (props.disabled) {
                return;
            }

            visible.value = true;
            emit('update:modelValue', true);
            emit('open');

            overlayService.open(props.name);

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

            overlayService.close(props.name);

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

        onBeforeUnmount(() => {
            removeOnClickOutsideEventBindings();
        });

        provide(ModalKey, {
            show,
            hide
        });

        return {
            classes,
            modalRef,
            wrapperRef,
            visible,
            isContentVNode,
            hide,
            onAfterEnter,
            onAfterLeave
        };
    }
});
</script>

<template>
    <Teleport to=".modal-container" :disabled="!teleport">
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
                <transition
                    :name="transition"
                    @after-enter="onAfterEnter"
                    @after-leave="onAfterLeave"
                >
                    <div v-show="visible" ref="modalRef" class="modal" :class="classes">
                        <!-- @slot default Slot for modal content -->
                        <slot>
                            <component :is="content" v-if="content && isContentVNode" />
                            <div v-else>{{ content }}</div>
                        </slot>
                    </div>
                </transition>
            </div>
        </transition>
    </Teleport>
</template>
