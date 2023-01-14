/* eslint-disable no-case-declarations */

import { defineComponent } from 'vue';
import {
    PopupMixin,
    PopupControlsMixin,
    sizePropValidator,
    colorVariantClass,
    defaultPropValue
} from '@inkline/inkline/mixins';
import { ClickOutside } from '@inkline/inkline/directives';
import { on, off, isFocusable, isKey } from '@inkline/inkline/helpers';
import { Classes } from '@inkline/inkline/types';

/**
 * Slot for dropdown trigger
 * @name default
 * @kind slot
 */

/**
 * Slot for dropdown header content
 * @name header
 * @kind slot
 */

/**
 * Slot for dropdown body content
 * @name body
 * @kind slot
 */

/**
 * Slot for dropdown footer content
 * @name footer
 * @kind slot
 */

const componentName = 'IDropdown';

export default defineComponent({
    name: componentName,
    directives: {
        ClickOutside
    },
    mixins: [PopupMixin, PopupControlsMixin],
    provide () {
        return {
            dropdown: this
        };
    },
    inject: {
        navbar: {
            default: () => ({
                onItemClick: () => {}
            })
        },
        sidebar: {
            default: () => ({
                onItemClick: () => {}
            })
        }
    },
    inheritAttrs: false,
    props: {
        /**
         * The duration of the hide and show animation
         * @type Number
         * @default 300
         * @name animationDuration
         */
        animationDuration: {
            type: Number,
            default: 300
        },
        /**
         * The color variant of the dropdown
         * @type light | dark
         * @default light
         * @name color
         */
        color: {
            type: String,
            default: defaultPropValue<string>(componentName, 'color')
        },
        /**
         * The disabled state of the dropdown
         * @type Boolean
         * @default false
         * @name disabled
         */
        disabled: {
            type: Boolean,
            default: false
        },
        /**
         * Used to hide the dropdown when clicking or selecting a dropdown item
         * @type Boolean
         * @default false
         * @name hideOnItemClick
         */
        hideOnItemClick: {
            type: Boolean,
            default: true
        },
        /**
         * The keydown events bound to the trigger element
         * @type string[]
         * @default [up, down, enter, space, tab, esc]
         * @name keydownTrigger
         */
        keydownTrigger: {
            type: Array,
            default: (): string[] => [
                'up',
                'down',
                'enter',
                'space',
                'tab',
                'esc'
            ]
        },
        /**
         * The keydown events bound to the dropdown item elements
         * @type string[]
         * @default [up, down, enter, space, tab, esc]
         * @name keydownItem
         */
        keydownItem: {
            type: Array,
            default: (): string[] => [
                'up',
                'down',
                'enter',
                'space',
                'tab',
                'esc'
            ]
        },
        /**
         * Used to manually control the visibility of the dropdown
         * @type Boolean
         * @default false
         * @name modelValue
         */
        modelValue: {
            type: Boolean,
            default: false
        },
        /**
         * Displays an arrow on the dropdown pointing to the trigger element
         * @type Boolean
         * @default true
         * @name arrow
         */
        arrow: {
            type: Boolean,
            default: true
        },
        /**
         * The placement of the dropdown
         * @type top | top-start | top-end | bottom | bottom-start | bottom-end | left | left-start | left-end | right | right-start | right-end
         * @default false
         * @name placement
         */
        placement: {
            type: String,
            default: 'bottom'
        },
        /**
         * The events used to trigger the dropdown
         * @type hover | focus | click | manual
         * @default [click]
         * @name trigger
         */
        trigger: {
            type: [String, Array],
            default: (): string[] => ['click']
        },
        /**
         * The offset of the dropdown relative to the trigger element
         * @type Number
         * @default 6
         * @name offset
         */
        offset: {
            type: Number,
            default: 6
        },
        /**
         * Determines whether hover state should be transferred from trigger to popup
         * @type Boolean
         * @default true
         * @name interactable
         */
        interactable: {
            type: Boolean,
            default: true
        },
        /**
         * Used to override the popper.js options used for creating the dropdown
         * @type Object
         * @default {}
         * @name popperOptions
         */
        popperOptions: {
            type: Object,
            default: (): any => ({})
        },
        /**
         * The size variant of the dropdown
         * @type sm | md | lg
         * @default md
         * @name size
         */
        size: {
            type: String,
            default: defaultPropValue<string>(componentName, 'size'),
            validator: sizePropValidator
        }
    },
    emits: [
        /**
         * Event emitted when clicking outside the dropdown elements
         * @event click-outside
         */
        'click-outside',
        /**
         * Event emitted for setting the modelValue
         * @event update:modelValue
         */
        'update:modelValue'
    ],
    computed: {
        classes (): Classes {
            return {
                ...colorVariantClass(this),
                [`-${this.size}`]: Boolean(this.size)
            };
        }
    },
    mounted () {
        for (const child of (this.$refs.trigger as HTMLElement).children) {
            on(child as HTMLElement, 'keydown', this.onTriggerKeyDown);
        }

        on(this.$refs.popup as HTMLElement, 'keydown', this.onItemKeyDown);
    },
    beforeUnmount () {
        for (const child of (this.$refs.trigger as HTMLElement).children) {
            off(child as HTMLElement, 'keydown', this.onTriggerKeyDown);
        }

        off(this.$refs.popup as HTMLElement, 'keydown', this.onItemKeyDown);
    },
    methods: {
        onEscape () {
            this.visible = false;
            this.$emit('update:modelValue', false);
        },
        handleClickOutside (event: MouseEvent) {
            this.visible = false;
            this.$emit('update:modelValue', false);
            this.onClickOutside(event);
        },
        getFocusableItems (): HTMLElement[] {
            const focusableItems = [];

            for (const child of (this.$refs.body as HTMLElement).children) {
                if (isFocusable(child as HTMLElement)) {
                    focusableItems.push(child as HTMLElement);
                }
            }

            return focusableItems;
        },
        onTriggerKeyDown (event: KeyboardEvent) {
            if (this.keydownTrigger.length === 0) {
                return;
            }

            const focusableItems = this.getFocusableItems();
            const activeIndex = focusableItems.findIndex(
                (item: any) => item.active
            );
            const initialIndex = activeIndex > -1 ? activeIndex : 0;
            const focusTarget = focusableItems[initialIndex];

            switch (true) {
            case isKey('up', event) && this.keydownTrigger.includes('up'):
            case isKey('down', event) &&
                    this.keydownTrigger.includes('down'):
                this.show();

                setTimeout(
                    () => {
                        focusTarget.focus();
                    },
                    this.visible ? 0 : this.animationDuration
                );

                event.preventDefault();
                event.stopPropagation();
                break;

            case isKey('enter', event) &&
                    this.keydownTrigger.includes('enter'):
            case isKey('space', event) &&
                    this.keydownTrigger.includes('space'):
                this.onClick();

                if (!this.visible) {
                    setTimeout(() => {
                        focusTarget.focus();
                    }, this.animationDuration);
                }

                event.preventDefault();
                break;

            case isKey('tab', event) && this.keydownTrigger.includes('tab'):
            case isKey('esc', event) && this.keydownTrigger.includes('esc'):
                this.hide();
                break;
            }
        },
        onItemKeyDown (event: KeyboardEvent) {
            if (this.keydownItem.length === 0) {
                return;
            }

            switch (true) {
            case isKey('up', event) && this.keydownItem.includes('up'):
            case isKey('down', event) && this.keydownItem.includes('down'):
                const focusableItems = this.getFocusableItems();

                const currentIndex = focusableItems.findIndex(
                    (item) => item === event.target
                );
                const maxIndex = focusableItems.length - 1;
                let nextIndex;

                if (isKey('up', event)) {
                    nextIndex = currentIndex > 0 ? currentIndex - 1 : 0;
                } else {
                    nextIndex =
                            currentIndex < maxIndex
                                ? currentIndex + 1
                                : maxIndex;
                }

                focusableItems[nextIndex].focus();

                event.preventDefault();
                event.stopPropagation();
                break;

            case isKey('enter', event) &&
                    this.keydownItem.includes('enter'):
            case isKey('space', event) &&
                    this.keydownItem.includes('space'):
                (event as any).target.click();

                if (this.hideOnItemClick) {
                    this.hide();
                }
                this.focusTrigger();

                event.preventDefault();
                break;

            case isKey('tab', event) && this.keydownItem.includes('tab'):
            case isKey('esc', event) && this.keydownItem.includes('esc'):
                this.hide();
                this.focusTrigger();

                event.preventDefault();
                break;
            }
        },
        onItemClick () {
            if (this.hideOnItemClick) {
                this.hide();
            }

            [(this as any).navbar, (this as any).sidebar].forEach((parent) => {
                parent.onItemClick();
            });
        }
    }
});
