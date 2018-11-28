import { keymap } from 'inkline/constants';
import { uid } from 'inkline/helpers';

import ClickOutside from 'inkline/directives/click-outside';

import AttributesProviderMixin from 'inkline/mixins/components/providers/AttributesProviderMixin';
import ClassesProviderMixin from 'inkline/mixins/components/providers/ClassesProviderMixin';
import EmitProviderMixin from 'inkline/mixins/components/providers/EmitProviderMixin';

import EmitFocusMethodMixin from 'inkline/mixins/components/methods/EmitFocusMethodMixin';

import VariantPropertyMixin from 'inkline/mixins/components/properties/VariantPropertyMixin';
import DisabledPropertyMixin from 'inkline/mixins/components/properties/DisabledPropertyMixin';

export default {
    name: 'IDropdown',
    mixins: [
        AttributesProviderMixin,
        ClassesProviderMixin,
        EmitProviderMixin,

        EmitFocusMethodMixin,

        VariantPropertyMixin,
        DisabledPropertyMixin
    ],
    directives: {
        ClickOutside
    },
    provide() {
        return {
            dropdown: this
        };
    },
    props: {
        trigger: {
            type: String,
            default: 'click'
        },
        hideOnClick: {
            type: Boolean,
            default: true
        },
        placement: {
            type: String,
            default: 'bottom'
        },
        showTimeout: {
            type: Number,
            default: 250
        },
        hideTimeout: {
            type: Number,
            default: 150
        }
    },
    data() {
        return {
            timeout: null,
            visible: false,
            menuItems: null,
            menuItemsArray: null,
            triggerElement: null,
            dropdownElement: null,
            focusing: false,
            id: this.$attrs.id || uid('dropdown-menu')
        };
    },
    watch: {
        visible(value) {
            this.broadcast('IDropdownMenu', 'visibility-change', value);
            this.$emit('visibility-change', value);
        }
    },
    methods: {
        onTriggerKeyDown(e) {
            const keyCode = e.key || e.keyIdentifier || e.keyCode;

            if ([keymap.up, keymap.down].indexOf(keyCode) > -1) {
                this.menuItems[0].focus();

                e.preventDefault();
                e.stopPropagation();

            } else if (keyCode === keymap.enter) {
                this.onClick();

            } else if ([keymap.tab, keymap.esc].indexOf(keyCode) > -1) {
                this.hide();
            }
        },
        onItemKeyDown(e) {
            const keyCode = e.key || e.keyIdentifier || e.keyCode;
            const target = e.target;
            const currentIndex = this.menuItemsArray.indexOf(target);
            const max = this.menuItemsArray.length - 1;
            let nextIndex;

            // Key: up || down
            if ([keymap.up, keymap.down].indexOf(keyCode) > -1) {
                if (keyCode === keymap.up) {
                    nextIndex = currentIndex !== 0 ? currentIndex - 1 : 0;
                } else {
                    nextIndex = currentIndex < max ? currentIndex + 1 : max;
                }
                this.menuItems[nextIndex].focus();

                e.preventDefault();
                e.stopPropagation();

            } else if (keyCode === keymap.enter) {
                this.triggerElement.focus();

                target.click();

                if (this.hideOnClick) {
                    this.visible = false;
                }

            } else if ([keymap.tab, keymap.esc].indexOf(keyCode) > -1) {
                this.hide();

                this.triggerElement.focus();
            }
        },
        show() {
            if (this.disabled) return;

            clearTimeout(this.timeout);

            this.timeout = setTimeout(() => {
                this.visible = true;
            }, this.trigger === 'click' ? 0 : this.showTimeout);
        },
        hide() {
            if (this.disabled) return;

            clearTimeout(this.timeout);

            this.timeout = setTimeout(() => {
                this.visible = false;
            }, this.trigger === 'click' ? 0 : this.hideTimeout);
        },
        onClick() {
            if (this.disabled) return;

            if (this.visible) {
                this.hide();
            } else {
                this.show();
            }
        },
        initAriaAttributes() {
            this.dropdownElement.setAttribute('id', this.id);
            this.triggerElement.setAttribute('aria-haspopup', 'list');
            this.triggerElement.setAttribute('aria-controls', this.id);

            this.menuItems = this.dropdownElement.querySelectorAll('li');
            this.menuItemsArray = Array.prototype.slice.call(this.menuItems);

            this.triggerElement.setAttribute('role', 'button');
            this.triggerElement.setAttribute('tabindex', '0');
        },
        initEvents() {
            this.triggerElement = this.$slots.default[0].elm;
            this.dropdownElement = this.$slots.default[this.$slots.default.length - 1].elm;

            this.triggerElement.addEventListener('keydown', this.onTriggerKeyDown); // triggerElement keydown
            this.dropdownElement.addEventListener('keydown', this.onItemKeyDown, true); // item keydown

            this.triggerElement.addEventListener('focus', () => {
                this.focusing = true;
            });
            this.triggerElement.addEventListener('blur', () => {
                this.focusing = false;
            });
            this.triggerElement.addEventListener('click', () => {
                this.focusing = false;
            });

            if (this.trigger === 'hover') {
                this.triggerElement.addEventListener('mouseenter', this.show);
                this.triggerElement.addEventListener('mouseleave', this.hide);
                this.dropdownElement.addEventListener('mouseenter', this.show);
                this.dropdownElement.addEventListener('mouseleave', this.hide);
            } else if (this.trigger === 'click') {
                this.triggerElement.addEventListener('click', this.onClick);
            }
        },
        handleMenuItemClick(command, instance) {
            if (this.hideOnClick) {
                this.visible = false;
            }

            this.$emit('command', command, instance);
        },
    },
    mounted() {
        this.$on('menu-item-click', this.handleMenuItemClick);

        this.initEvents();
        this.initAriaAttributes();
    },
};
