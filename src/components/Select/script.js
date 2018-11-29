import IInput from 'inkline/components/Input';
import IDropdown from 'inkline/components/Dropdown';
import IDropdownMenu from 'inkline/components/DropdownMenu';

import AttributesProviderMixin from 'inkline/mixins/components/providers/AttributesProviderMixin';
import ClassesProviderMixin from 'inkline/mixins/components/providers/ClassesProviderMixin';
import InjectParentFormProviderMixin from 'inkline/mixins/forms/providers/InjectParentFormProviderMixin';
import ModelProviderMixin from 'inkline/mixins/forms/providers/ModelProviderMixin';

import EmitChangeMethodMixin from 'inkline/mixins/components/methods/EmitChangeMethodMixin';
import EmitClickMethodMixin from 'inkline/mixins/components/methods/EmitClickMethodMixin';
import EmitFocusMethodMixin from 'inkline/mixins/components/methods/EmitFocusMethodMixin';
import EmitKeydownMethodMixin from 'inkline/mixins/components/methods/EmitKeydownMethodMixin';
import EmitKeyupMethodMixin from 'inkline/mixins/components/methods/EmitKeyupMethodMixin';

import DisabledPropertyMixin from 'inkline/mixins/forms/properties/DisabledPropertyMixin';
import ReadonlyPropertyMixin from 'inkline/mixins/forms/properties/ReadonlyPropertyMixin';
import ParentFormGroupPropertyMixin from 'inkline/mixins/forms/properties/ParentFormGroupPropertyMixin';
import SizePropertyMixin from 'inkline/mixins/components/properties/SizePropertyMixin';
import TabIndexPropertyMixin from 'inkline/mixins/components/properties/TabIndexPropertyMixin';

export default {
    name: 'ISelect',
    components: {
        IInput,
        IDropdown,
        IDropdownMenu
    },
    mixins: [
        AttributesProviderMixin,
        ClassesProviderMixin,
        InjectParentFormProviderMixin,
        ModelProviderMixin,

        // ClickMethodMixin,
        // FocusMethodMixin,
        EmitChangeMethodMixin,
        EmitClickMethodMixin,
        EmitFocusMethodMixin,
        EmitKeydownMethodMixin,
        EmitKeyupMethodMixin,
        // EmitHoverMethodMixin,
        // EmitInputMethodMixin,

        DisabledPropertyMixin,
        ParentFormGroupPropertyMixin,
        ReadonlyPropertyMixin,
        SizePropertyMixin,
        TabIndexPropertyMixin
    ],
    props: {
        filterable: {
            type: Boolean,
            default: false
        },
        native: {
            type: Boolean,
            default: false
        }
    },
    data() {
        return {
            labelModel: '',
            options: []
        }
    },
    methods: {
        focusInputRef() {
            this.$isMobile ? this.$refs.select.focus() : this.$refs.input.focusInputRef();
        },
        clickInputRef() {
            if (this.$isMobile) {
                this.$refs.select.click();
            } else {
                this.$refs.input.clickInputRef();
                this.$refs.dropdown.visible ? this.$refs.dropdown.hide() : this.$refs.dropdown.show();
            }
        },
        onKeydown(e) {
            // if (isKey('space', e)) {
            //     e.preventDefault();
            //     this.clickInputRef();
            // }
            //
            // if (isKey('up', e) || isKey('down', e)) {
            //     console.log(this.options)
            // }

            this.$emit('keydown', e);
        }
    },
    created() {
        this.$on('option-click', (data) => {
            this.model = data.value;
        });

        this.$on('option-mounted', (data) => {
            this.options.push(data);
        });

        this.$on('option-destroyed', (data) => {
            this.options = this.options.filter((o) => o.value !== data.value);
        });
    },
    watch: {
        model(value) {
            const option = this.options.find((o) => o.value === value);

            this.labelModel = option.label || option.value;
        }
    }
};
