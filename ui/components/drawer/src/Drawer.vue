<script lang="ts">
import type { PropType } from 'vue';
import { defineComponent, ref, toRef, computed, watch, onMounted, onBeforeUnmount } from 'vue';
import { addClass, removeClass, uid } from '@inkline/utils';
import { useComponentColor, useComponentSize, useClickOutside } from '@inkline/composables';
import type { Renderable } from '@inkline/types';
import { Icon } from '@inkline/component-icon';

const componentName = 'Drawer';

export default defineComponent({
    name: componentName,
    inheritAttrs: false,
    props: {
        /**
         * Determines if the drawer should close when pressing escape
         * @param {boolean} closeOnPressEscape
         * @default true
         */
        closeOnPressEscape: {
            type: Boolean,
            default: true
        },
        /**
         * The aria-label attribute of the close button
         * @param {string} closeAriaLabel
         * @default Close
         */
        closeAriaLabel: {
            type: String,
            default: 'Close'
        },
        /**
         * The color variant of the drawer
         * @param {'primary' | 'secondary' | 'light' | 'dark' | 'info' | 'success' | 'warning' | 'danger'} color
         * @default
         */
        color: {
            type: String,
            default: undefined
        },
        /**
         * The disabled state of the drawer
         * @param {boolean} disabled
         * @default false
         */
        disabled: {
            type: Boolean,
            default: false
        },
        /**
         * Make the drawer cover the entire screen
         * @param {boolean} fullscreen
         * @default false
         */
        fullscreen: {
            type: Boolean,
            default: false
        },
        /**
         * Determines if the drawer should close when clicking the overlay
         * @param {boolean} hideOnClickOutside
         * @default true
         */
        hideOnClickOutside: {
            type: Boolean,
            default: true
        },
        /**
         * The identifier of the drawer
         * @param {string} name
         * @default uid()
         */
        name: {
            type: String,
            default: (): string => {
                return uid('drawer');
            }
        },
        /**
         * Determines if the close icon should be visible in the drawer header
         * @param {boolean} dismissible
         * @default false
         */
        dismissible: {
            type: Boolean,
            default: true
        },
        /**
         * The position of the drawer
         * @param {'top' | 'right' | 'bottom' | 'left'} position
         * @default left
         */
        position: {
            type: String,
            default: 'left',
            validator: (value: string) => ['top', 'right', 'bottom', 'left'].includes(value)
        },
        /**
         * The size variant of the drawer
         * @param {'sm' | 'md' | 'lg'} size
         * @default
         */
        size: {
            type: String,
            default: undefined
        },
        /**
         * Used to determine if drawer is visible or not
         * @param {boolean} modelValue
         * @default false
         */
        modelValue: {
            type: Boolean,
            default: false
        },
        /**
         * The drawer opening and closing animation
         * @param {'fade-in-transition' | 'fade-in-linear-transition' | 'zoom-in-top-transition' | 'zoom-in-bottom-transition' | 'zoom-in-center-transition' | 'zoom-in-left-transition' | 'zoom-in-right-transition'} transition
         * @default zoom-in-center-transition
         */
        transition: {
            type: String,
            default: undefined
        },
        /**
         * The header of the drawer
         * @param {string | VNode | VNode[]} header
         * @default undefined
         */
        header: {
            type: [String, Object] as PropType<Renderable>,
            default: undefined
        },
        /**
         * The icon of the drawer
         * @param {string | VNode | VNode[]} icon
         * @default undefined
         */
        icon: {
            type: [String, Object] as PropType<Renderable>,
            default: undefined
        },
        /**
         * The body of the drawer
         * @param {string | VNode | VNode[]} body
         * @default undefined
         */
        body: {
            type: [String, Object] as PropType<Renderable>,
            default: undefined
        },
        /**
         * The footer of the drawer
         * @param {string | VNode | VNode[]} footer
         * @default undefined
         */
        footer: {
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
         * Event emitted when the drawer is open
         * @event open
         */
        'open',
        /**
         * Event emitted when the drawer is opened and animation is finished
         * @event opened
         */
        'opened',
        /**
         * Event emitted when the drawer is closed
         * @event close
         */
        'close',
        /**
         * Event emitted when the drawer is closed and animation is finished
         * @event close
         */
        'closed'
    ],
    components: {
        Icon
    },
    setup(props, { emit }) {
        const visible = ref(props.modelValue);

        const rawColor = toRef(props, 'color');
        const rawSize = toRef(props, 'size');
        const { color } = useComponentColor(componentName, rawColor);
        const { size } = useComponentSize(componentName, rawSize);

        const classes = computed(() => ({
            [`-${color.value}`]: true,
            [`-${size.value}`]: true,
            [`-${props.position}`]: true,
            '-disabled': props.disabled,
            '-fullscreen': props.fullscreen
        }));

        const wrapperClasses = computed(() => ({
            [`-${props.position}`]: true
        }));

        const wrapperRef = ref<HTMLElement | null>(null);
        const drawerRef = ref<HTMLElement | null>(null);

        const isVNode = computed(() => ({
            header: typeof props.header === 'object',
            icon: typeof props.icon === 'object',
            body: typeof props.body === 'object',
            footer: typeof props.footer === 'object'
        }));

        const defaultTransitionMap = {
            top: 'zoom-in-top-transition',
            right: 'zoom-in-right-transition',
            bottom: 'zoom-in-bottom-transition',
            left: 'zoom-in-left-transition'
        };

        const computedTransition = computed(() => {
            if (props.transition) {
                return props.transition;
            }
            return (
                defaultTransitionMap[props.position as keyof typeof defaultTransitionMap] ||
                'zoom-in-center-transition'
            );
        });

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

        const removeOnClickOutsideEventBindings = useClickOutside(drawerRef, onClickOutside);

        function handleEscapeKeydown(event: KeyboardEvent): void {
            if (props.closeOnPressEscape && event.key === 'Escape' && visible.value) {
                hide();
            }
        }

        function show(): void {
            if (props.disabled) {
                return;
            }

            visible.value = true;
            emit('update:modelValue', true);
            emit('open');

            if (typeof window !== 'undefined') {
                addClass(window.document.body, '-drawer');
            }
        }

        function hide(): void {
            if (props.disabled || !visible.value) {
                return;
            }

            visible.value = false;
            emit('update:modelValue', false);
            emit('close');

            if (typeof window !== 'undefined') {
                removeClass(window.document.body, '-drawer');
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

        onMounted(() => {
            if (props.modelValue) {
                show();
            }

            if (props.closeOnPressEscape && typeof window !== 'undefined') {
                window.addEventListener('keydown', handleEscapeKeydown);
            }
        });

        onBeforeUnmount(() => {
            removeOnClickOutsideEventBindings();

            if (typeof window !== 'undefined') {
                window.removeEventListener('keydown', handleEscapeKeydown);
            }
        });

        return {
            classes,
            wrapperClasses,
            drawerRef,
            wrapperRef,
            visible,
            isVNode,
            hide,
            onAfterEnter,
            onAfterLeave,
            computedTransition
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
            class="drawer-wrapper"
            :class="wrapperClasses"
            role="dialog"
            aria-modal="true"
            :aria-hidden="visible ? 'false' : 'true'"
            :name="name"
            :aria-labelledby="`${name}-header`"
        >
            <transition
                :name="computedTransition"
                @after-enter="onAfterEnter"
                @after-leave="onAfterLeave"
            >
                <div v-show="visible" ref="drawerRef" class="drawer" :class="classes">
                    <div
                        v-if="header || $slots.header"
                        :id="`${name}-header`"
                        class="drawer-header"
                    >
                        <!-- @slot footer Slot for drawer header content -->
                        <slot name="header">
                            <component :is="header" v-if="header && isVNode.header" />
                            <div v-else>{{ header }}</div>
                        </slot>

                        <!-- @slot close Close button slot -->
                        <slot v-if="dismissible || $slots.close" name="close" :hide="hide">
                            <button
                                class="drawer-close"
                                aria-hidden="true"
                                :aria-label="closeAriaLabel"
                                @click="hide"
                            >
                                <Icon name="ink:close" />
                            </button>
                        </slot>
                    </div>
                    <div v-if="body || $slots.default" class="drawer-body">
                        <div v-if="icon || $slots.icon" class="drawer-icon">
                            <slot name="icon">
                                <component :is="icon" v-if="icon && isVNode.icon" />
                                <div v-else>{{ icon }}</div>
                            </slot>
                        </div>
                        <div class="drawer-content">
                            <!-- @slot default Slot for drawer body content -->
                            <slot>
                                <component :is="body" v-if="body && isVNode.body" />
                                <div v-else>{{ body }}</div>
                            </slot>
                        </div>
                    </div>
                    <div v-if="footer || $slots.footer" class="drawer-footer">
                        <!-- @slot footer Slot for drawer footer content -->
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
