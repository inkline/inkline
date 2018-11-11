import ClickOutside from '../../directives/click-outside';

import { uid } from '../../helpers/unique-id';

// import Emitter from 'element-ui/src/mixins/emitter';
import AttributesProviderMixin from '../../mixins/components/providers/AttributesProviderMixin';
import ClassesProviderMixin from '../../mixins/components/providers/ClassesProviderMixin';

import OnFocusMethodMixin from '../../mixins/components/methods/OnFocusMethodMixin';

import VariantPropertyMixin from '../../mixins/components/properties/VariantPropertyMixin';
import DisabledPropertyMixin from '../../mixins/components/properties/DisabledPropertyMixin';

export default {
    name: 'Dropdown',
    mixins: [
        AttributesProviderMixin,
        ClassesProviderMixin,

        OnFocusMethodMixin,

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
            default: 'bottom-end'
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
    methods: {
        onTriggerKeyDown(e) {
            const keyCode = e.key || e.keyIdentifier || e.keyCode;

            // Key: up || down
            if ([38, 40].indexOf(keyCode) > -1) {
                this.menuItems[0].focus();

                e.preventDefault();
                e.stopPropagation();

            // Key: space || enter
            } else if (keyCode === 13) {
                this.onClick();

            // Key: tab || esc
            } else if ([9, 27].indexOf(keyCode) > -1) {
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
            if ([38, 40].indexOf(keyCode) > -1) {
                if (keyCode === 38) {
                    nextIndex = currentIndex !== 0 ? currentIndex - 1 : 0;
                } else {
                    nextIndex = currentIndex < max ? currentIndex + 1 : max;
                }
                this.menuItems[nextIndex].focus();

                e.preventDefault();
                e.stopPropagation();

            // Key: space || enter
            } else if (keyCode === 13) {
                this.triggerElement.focus();

                target.click();

                if (this.hideOnClick) {
                    this.visible = false;
                }

            // Key: tab || esc
            } else if ([9, 27].indexOf(keyCode) > -1) {
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
            this.triggerElement.setAttribute('aria-controls', this.listId);

            this.menuItems = this.dropdownElement.querySelectorAll('li');
            this.menuItemsArray = Array.prototype.slice.call(this.menuItems);

            this.triggerElement.setAttribute('role', 'button');
            this.triggerElement.setAttribute('tabindex', '0');
        },
        initEvents() {
            this.triggerElement = this.$slots.trigger[0].elm;
            this.dropdownElement = this.$slots.default[0].elm;

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
