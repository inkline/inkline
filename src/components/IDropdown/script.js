import { uid, isKey, querySelector, querySelectorAll, isVisible } from '@inkline/inkline/src/helpers';
import ClickOutside from '@inkline/inkline/src/directives/click-outside';
import {
    AttributesProviderMixin,
    ClassesProviderMixin,
    EmitProviderMixin,
    PopupControlsProviderMixin,
    EmitFocusMethodMixin,
    SizePropertyMixin,
    VariantPropertyMixin,
    DisabledPropertyMixin
} from '@inkline/inkline/src/mixins';

export default {
    name: 'IDropdown',
    mixins: [
        AttributesProviderMixin,
        ClassesProviderMixin,
        EmitProviderMixin,
        PopupControlsProviderMixin,

        EmitFocusMethodMixin,

        SizePropertyMixin,
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
        hideOnClick: {
            type: Boolean,
            default: true
        },
        placement: {
            type: String,
            default: 'bottom'
        },
        keymap: {
            type: Object,
            default: () => ({})
        }
    },
    data() {
        const basename = 'dropdown';

        return {
            id: this.$attrs.id || uid(basename + '-menu'),
            items: [],
            menu: null,
            basename
        };
    },
    computed: {
        actionKeymap() {
            return {
                navigate: ['up', 'down'],
                select: ['enter', 'space'],
                show: ['enter', 'space'],
                hide: ['esc', 'tab'],

                ...this.keymap
            };
        },
        focusableItems() {
            return this.items.filter((item) => !(item.disabled || (item.componentInstance || {}).disabled) &&
                isVisible(item.elm || item.$el));
        }
    },
    watch: {
        visible(value) {
            this.broadcast('IDropdownMenu', 'visibility-change', value);
            this.$emit('change', value);
        }
    },
    methods: {
        onTriggerKeyDown(e) {
            if (!this.focusableItems.length > 0) { return; }

            let activeIndex = this.focusableItems.findIndex((e) => e.active);
            let initialIndex = activeIndex > -1 ? activeIndex : 0;
            const focusTarget = this.focusableItems[initialIndex].elm || this.focusableItems[initialIndex].$el;

            // Default key: up or down
            if (this.actionKeymap.navigate.some((key) => isKey(key, e))) {
                this.show();

                setTimeout(() => {
                    focusTarget.focus();
                }, this.visible ? 0 : this.showTimeout);

                e.preventDefault();
                e.stopPropagation();

            // Default key: enter or space
            } else if (this.actionKeymap.show.some((key) => isKey(key, e))) {
                this.onClick();

                if (!this.visible) {
                    setTimeout(() => {
                        focusTarget.focus();
                    }, this.showTimeout);
                }

                e.preventDefault();

            // Default key: tab or esc
            } else if (this.actionKeymap.hide.some((key) => isKey(key, e))) {
                this.hide();
            }
        },
        onItemKeyDown(e) {
            if (!this.focusableItems.length > 0) { return; }

            // Default key: up or down
            if (this.actionKeymap.navigate.some((key) => isKey(key, e))) {
                const currentIndex = this.focusableItems.findIndex((i) => (i.elm || i.$el) === e.target);
                const maxIndex = this.focusableItems.length - 1;
                let nextIndex;

                if (isKey('up', e)) {
                    nextIndex = currentIndex > 0 ? currentIndex - 1 : 0;
                } else {
                    nextIndex = currentIndex < maxIndex ? currentIndex + 1 : maxIndex;
                }

                const focusTarget = this.focusableItems[nextIndex].elm || this.focusableItems[nextIndex].$el;
                focusTarget.focus();

                e.preventDefault();
                e.stopPropagation();

            // Default key: enter or space
            } else if (this.actionKeymap.select.some((key) => isKey(key, e))) {
                e.target.click();

                if (e.target.hasAttribute('aria-haspopup')) {
                    this.initItems();
                } else {
                    this.triggerElement.focus();
                }

                if (this.hideOnClick) {
                    this.visible = false;
                }

                e.preventDefault();

            // Default key: tab or esc
            } else if (this.actionKeymap.hide.some((key) => isKey(key, e))) {
                this.hide();

                this.triggerElement.focus();
            }
        },
        onItemClick(action, instance) {
            if (this.hideOnClick) {
                this.visible = false;
            }

            this.$emit('action', action, instance);
        },
        initElements() {
            if ((this.$slots.default || []).length < 2) {
                throw new Error(`IDropdown component requires two child elements.
                The first one will be used as a trigger. The second one should be a IDropdownMenu component.`);
            }

            this.menu = querySelector(this.$slots.default, 'IDropdownMenu');

            if (!this.menu) {
                throw new Error('Could not find child IDropdownMenu in IDropdown.')
            }

            this.triggerElement = this.$slots.default[0].elm;
            this.popupElement = this.menu.elm;

            this.initItems();
        },
        initItems() {
            this.items = querySelectorAll(this.menu.componentInstance.$slots.default, 'IDropdownItem');
        }
    },
    mounted() {
        this.$on('init', this.initElements);
        this.$on('item-click', this.onItemClick);

        this.triggerElement.addEventListener('keydown', this.onTriggerKeyDown);
        this.popupElement.addEventListener('keydown', this.onItemKeyDown, true);

        if (this.trigger === 'hover') {
            this.popupElement.addEventListener('mouseenter', this.show);
            this.popupElement.addEventListener('mouseleave', this.hide);
        }
    },
};
