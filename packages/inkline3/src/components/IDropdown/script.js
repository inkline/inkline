import {
    PopupMixin,
    PopupControlsMixin,
    sizePropValidator,
    colorVariantClass
} from '@inkline/inkline/src/mixins';
import { ClickOutside } from '@inkline/inkline/src/directives';
import { on, off, isFocusable, isKey } from "@inkline/inkline/src/helpers";


/**
 * @name default
 * @kind slot
 * @description Slot for dropdown trigger
 */

/**
 * @name header
 * @kind slot
 * @description Slot for dropdown header content
 */

/**
 * @name body
 * @kind slot
 * @description Slot for dropdown body content
 */

/**
 * @name footer
 * @kind slot
 * @description Slot for dropdown footer content
 */

export default {
    name: 'IDropdown',
    mixins: [
        PopupMixin,
        PopupControlsMixin
    ],
    directives: {
        ClickOutside
    },
    emits: [
        /**
         * @event update:modelValue
         * @description Event emitted for setting the modelValue
         */
        'update:modelValue'
    ],
    props: {
        /**
         * @description The duration of the hide and show animation
         * @type Number
         * @default 300
         */
        animationDuration: {
            type: Number,
            default: 300
        },
        /**
         * @description The color variant of the dropdown
         * @type light | dark
         * @default light
         */
        color: {
            type: String,
            default: ''
        },
        /**
         * @description The disabled state of the dropdown
         * @type Boolean
         * @default false
         */
        disabled: {
            type: Boolean,
            default: false
        },
        /**
         * @description Used to hide the dropdown when clicking or selecting a dropdown item
         * @type Boolean
         * @default false
         */
        hideOnItemClick: {
            type: Boolean,
            default: true
        },
        /**
         * @description The keydown events bound to the trigger element
         * @type string[]
         * @default [up, down, enter, space, tab, esc]
         */
        keydownTrigger: {
            type: Array,
            default: () => ['up', 'down', 'enter', 'space', 'tab', 'esc']
        },
        /**
         * @description The keydown events bound to the dropdown item elements
         * @type string[]
         * @default [up, down, enter, space, tab, esc]
         */
        keydownItem: {
            type: Array,
            default: () => ['up', 'down', 'enter', 'space', 'tab', 'esc']
        },
        /**
         * @description Used to manually control the visibility of the dropdown
         * @type Boolean
         * @default false
         */
        modelValue: {
            type: Boolean,
            default: false
        },
        /**
         * @description Displays an arrow on the dropdown pointing to the trigger element
         * @type Boolean
         * @default true
         */
        arrow: {
            type: Boolean,
            default: true
        },
        /**
         * @description The placement of the dropdown
         * @type top | top-start | top-end | bottom | bottom-start | bottom-end | left | left-start | left-end | right | right-start | right-end
         * @default false
         */
        placement: {
            type: String,
            default: 'bottom',
        },
        /**
         * @description The events used to trigger the dropdown
         * @type hover | focus | click | manual
         * @default [click]
         */
        trigger: {
            type: [String, Array],
            default: ['click']
        },
        /**
         * @description The offset of the dropdown relative to the trigger element
         * @type Number
         * @default 6
         */
        offset: {
            type: Number,
            default: 6
        },
        /**
         * @description Used to override the popper.js options used for creating the dropdown
         * @type Object
         * @default {}
         */
        popperOptions: {
            type: Object,
            default: () => ({})
        },
        /**
         * @description The size variant of the dropdown
         * @type sm | md | lg
         * @default md
         */
        size: {
            type: String,
            default: '',
            validator: sizePropValidator
        },
    },
    provide() {
        return {
            dropdown: this
        };
    },
    computed: {
        classes() {
            return {
                ...colorVariantClass(this),
                [`-${this.size}`]: Boolean(this.size),
            }
        }
    },
    methods: {
        onEscape() {
            this.visible = false;
            this.$emit('update:modelValue', false);
        },
        handleClickOutside() {
            this.visible = false;
            this.$emit('update:modelValue', false);
            this.onClickOutside();
        },
        getFocusableItems() {
            const focusableItems = [];

            for (const child of this.$refs.body.children) {
                if (isFocusable(child)) {
                    focusableItems.push(child);
                }
            }

            return focusableItems;
        },
        onTriggerKeyDown(event) {
            if (this.keydownTrigger.length === 0) {
                return;
            }

            const focusableItems = this.getFocusableItems();
            const activeIndex = focusableItems.findIndex((item) => item.active);
            const initialIndex = activeIndex > -1 ? activeIndex : 0;
            const focusTarget = focusableItems[initialIndex];

            switch (true) {
                case isKey('up', event) && this.keydownTrigger.includes('up'):
                case isKey('down', event) && this.keydownTrigger.includes('down'):
                    this.show();

                    setTimeout(() => {
                        focusTarget.focus();
                    }, this.visible ? 0 : this.animationDuration);

                    event.preventDefault();
                    event.stopPropagation();
                    break;

                case isKey('enter', event) && this.keydownTrigger.includes('enter'):
                case isKey('space', event) && this.keydownTrigger.includes('space'):
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
        onItemKeyDown(event) {
            if (this.keydownItem.length === 0) {
                return;
            }

            switch (true) {
                case isKey('up', event) && this.keydownItem.includes('up'):
                case isKey('down', event) && this.keydownItem.includes('down'):
                    const focusableItems = this.getFocusableItems();

                    const currentIndex = focusableItems.findIndex((item) => item === event.target);
                    const maxIndex = focusableItems.length - 1;
                    let nextIndex;

                    if (isKey('up', event)) {
                        nextIndex = currentIndex > 0 ? currentIndex - 1 : 0;
                    } else {
                        nextIndex = currentIndex < maxIndex ? currentIndex + 1 : maxIndex;
                    }

                    focusableItems[nextIndex].focus();

                    event.preventDefault();
                    event.stopPropagation();
                    break;

                case isKey('enter', event) && this.keydownItem.includes('enter'):
                case isKey('space', event) && this.keydownItem.includes('space'):
                    event.target.click();

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
        onItemClick() {
            if (this.hideOnItemClick) {
                this.hide();
            }
        }
    },
    mounted() {
        for (const child of this.$refs.trigger.children) {
            on(child, 'keydown', this.onTriggerKeyDown);
        }

        on(this.$refs.popup, 'keydown', this.onItemKeyDown);
    },
    beforeUnmount() {
        for (const child of this.$refs.trigger.children) {
            off(child, 'keydown', this.onTriggerKeyDown);
        }

        off(this.$refs.popup, 'keydown', this.onItemKeyDown);
    }
}

