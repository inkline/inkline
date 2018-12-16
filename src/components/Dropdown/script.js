import { uid, isKey } from 'inkline/helpers';

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
            items: [],
            timeout: null,
            visible: false,
            triggerElement: null,
            dropdownElement: null,
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
            let activeIndex = this.items.findIndex((e) => e.active);
            let initialIndex = activeIndex > -1 ? activeIndex : 0;

            if (isKey('up', e) || isKey('down', e)) {
                this.show();

                setTimeout(() => {
                    this.items[initialIndex].$el.focus();
                }, this.visible ? 0 : this.showTimeout);

                e.preventDefault();
                e.stopPropagation();

            } else if (isKey('enter', e) || isKey('space', e)) {
                this.onClick();

                if (!this.visible) {
                    setTimeout(() => {
                        this.items[initialIndex].$el.focus();
                    }, this.showTimeout);
                }

                e.preventDefault();

            } else if (isKey('tab', e) || isKey('esc', e)) {
                this.hide();
            }
        },
        onItemKeyDown(e) {
            const target = e.target;
            const currentIndex = this.items.findIndex((i) => i.$el === e.target);
            const maxIndex = this.items.length - 1;
            let nextIndex;

            // Key: up || down
            if (isKey('up', e) || isKey('down', e)) {
                if (isKey('up', e)) {
                    nextIndex = currentIndex !== 0 ? currentIndex - 1 : 0;
                } else {
                    nextIndex = currentIndex < maxIndex ? currentIndex + 1 : maxIndex;
                }

                this.items[nextIndex].$el.focus();

                e.preventDefault();
                e.stopPropagation();

            } else if (isKey('enter', e) || isKey('space', e)) {
                target.click();

                this.triggerElement.focus();

                if (this.hideOnClick) {
                    this.visible = false;
                }

                e.preventDefault();

            } else if (isKey('tab', e) || isKey('esc', e)) {
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
        initElements() {
            this.triggerElement = this.$slots.default[0].elm;
            this.dropdownElement = this.$slots.default[this.$slots.default.length - 1].elm;
        },
        initAriaAttributes() {
            this.dropdownElement.setAttribute('id', this.id);
            this.triggerElement.setAttribute('aria-haspopup', 'list');
            this.triggerElement.setAttribute('aria-controls', this.id);
        },
        initEvents() {
            this.triggerElement.addEventListener('keydown', this.onTriggerKeyDown);
            this.dropdownElement.addEventListener('keydown', this.onItemKeyDown, true);

            if (this.trigger === 'hover') {
                this.triggerElement.addEventListener('mouseenter', this.show);
                this.triggerElement.addEventListener('mouseleave', this.hide);
                this.dropdownElement.addEventListener('mouseenter', this.show);
                this.dropdownElement.addEventListener('mouseleave', this.hide);
            } else if (this.trigger === 'click') {
                this.triggerElement.addEventListener('click', this.onClick);
            }
        },
        handleMenuItemClick(action, instance) {
            if (this.hideOnClick) {
                this.visible = false;
            }

            this.$emit('action', action, instance);
        },
    },
    created() {
        this.$on('dropdown-item-mounted', (item) => {
            this.items.push(item);
        });

        this.$on('dropdown-item-destroyed', (item) => {
            this.items = this.items.filter((i) => i === item);
        });
    },
    mounted() {
        this.$on('menu-item-click', this.handleMenuItemClick);

        this.initElements();
        this.initEvents();
        this.initAriaAttributes();
    },
};
