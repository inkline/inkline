<script lang="ts">
import { defineComponent } from 'vue';
import { addClass, removeClass, uid } from '@grozav/utils';
import { OverlayController } from '@inkline/inkline/controllers';
import {
    computedColorValue,
    computedSizeValue
} from '@inkline/inkline/mixins';
import { ClickOutside } from '@inkline/inkline/directives';
import { Classes } from '@inkline/inkline/types';

/**
 * Event emitted for setting the modelValue
 * @event update:modelValue
 */

/**
 * Slot for modal body content
 * @name default
 * @kind slot
 */

/**
 * Slot for modal header content
 * @name header
 * @kind slot
 */

/**
 * Slot for modal footer content
 * @name footer
 * @kind slot
 */

const componentName = 'IModal';

export default defineComponent({
    name: componentName,
    directives: {
        ClickOutside
    },
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
            default (): string {
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
    data (): { visible: boolean } {
        return {
            visible: (this as any).modelValue as boolean
        };
    },
    computed: {
        computedColor (): string | undefined {
            return computedColorValue(componentName, this.color);
        },
        computedSize (): string | undefined {
            return computedSizeValue(componentName, this.size);
        },
        classes (): Classes {
            return {
                [`-${this.computedColor}`]: Boolean(this.computedColor),
                [`-${this.computedSize}`]: Boolean(this.computedSize),
                '-disabled': (this as any).disabled,
            };
        }
    },
    watch: {
        modelValue (value) {
            if (value) {
                this.show();
            } else {
                this.hide();
            }
        }
    },
    mounted () {
        OverlayController.register(this as any);
    },
    unmounted () {
        OverlayController.unregister(this as any);
    },
    methods: {
        show (): void {
            if ((this as any).disabled) {
                return;
            }

            this.visible = true;
            this.$emit('update:modelValue', true);

            OverlayController.open((this as any).name);

            if (typeof window !== 'undefined') {
                addClass(window.document.body, '-modal');
            }
        },
        hide (): void {
            if ((this as any).disabled) {
                return;
            }

            this.visible = false;
            this.$emit('update:modelValue', false);

            OverlayController.close((this as any).name);

            if (typeof window !== 'undefined') {
                removeClass(window.document.body, '-modal');
            }
        },
        onClickOutside (): void {
            if (!(this as any).hideOnClickOutside) {
                return;
            }

            this.hide();
        }
    }
});
</script>

<template>
    <transition name="fade-in-transition">
        <div
            class="modal-wrapper"
            role="dialog"
            aria-modal="true"
            :aria-hidden="visible ? 'false' : 'true'"
            :class="classes"
            v-show="visible"
            :id="name"
            :name="name"
            :aria-labelledby="`${name}-header`"
        >
            <transition :name="transition">
                <div class="modal" v-click-outside="onClickOutside" v-show="visible">
                    <div class="modal-header" :id="`${name}-header`" v-if="$slots.header">
                        <slot name="header" />
                        <button
                            class="close"
                            aria-hidden="true"
                            :aria-label="closeAriaLabel"
                            @click="hide"
                            v-if="showClose"
                        >
                            <slot name="close">
                                <i class="icon" />
                            </slot>
                        </button>
                    </div>
                    <div class="modal-body" v-if="$slots.default">
                        <slot />
                    </div>
                    <div class="modal-footer" v-if="$slots.footer">
                        <slot name="footer" />
                    </div>
                </div>
            </transition>
        </div>
    </transition>
</template>