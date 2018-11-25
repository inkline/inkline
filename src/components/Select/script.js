import { uid } from 'inkline/helpers';

import ITooltip from 'inkline/components/Tooltip';
import IInputGroup from 'inkline/components/InputGroup';

import ClassesProviderMixin from 'inkline/mixins/components/providers/ClassesProviderMixin';
import InjectParentFormProviderMixin from 'inkline/mixins/forms/providers/InjectParentFormProviderMixin';
import ModelProviderMixin from 'inkline/mixins/forms/providers/ModelProviderMixin';

import ClickMethodMixin from 'inkline/mixins/forms/methods/ClickMethodMixin';
import FocusMethodMixin from 'inkline/mixins/forms/methods/FocusMethodMixin';
import OnChangeMethodMixin from 'inkline/mixins/components/methods/OnChangeMethodMixin';
import OnFocusMethodMixin from 'inkline/mixins/components/methods/OnFocusMethodMixin';
import OnHoverMethodMixin from 'inkline/mixins/components/methods/OnHoverMethodMixin';
import OnInputMethodMixin from 'inkline/mixins/components/methods/OnInputMethodMixin';

import DisabledPropertyMixin from 'inkline/mixins/forms/properties/DisabledPropertyMixin';
import IsGroupedPropertyMixin from 'inkline/mixins/forms/properties/IsGroupedPropertyMixin';
import LabelPositionPropertyMixin from 'inkline/mixins/forms/properties/LabelPositionPropertyMixin';
import SizePropertyMixin from 'inkline/mixins/components/properties/SizePropertyMixin';
import TabIndexPropertyMixin from 'inkline/mixins/components/properties/TabIndexPropertyMixin';

export default {
    name: 'ISelect',
    extends: ITooltip,
    components: {
        IInputGroup,
    },
    mixins: [
        ClassesProviderMixin,
        InjectParentFormProviderMixin,
        ModelProviderMixin,

        ClickMethodMixin,
        FocusMethodMixin,
        OnChangeMethodMixin,
        OnFocusMethodMixin,
        OnHoverMethodMixin,
        OnInputMethodMixin,

        DisabledPropertyMixin,
        IsGroupedPropertyMixin,
        LabelPositionPropertyMixin,
        SizePropertyMixin,
        TabIndexPropertyMixin
    ],
    props: {
        trigger: {
            type: String,
            default: 'click'
        },
        placement: {
            type: String,
            default: 'bottom'
        },
        filtered: {
            type: Boolean,
            default: false
        }
    },
    data() {
        return {
            id: this.$attrs.id || uid('select')
        };
    },
    methods: {
        initAriaAttributes() {
            this.popupElement.setAttribute('id', this.id);
            this.triggerElement.setAttribute('aria-haspopup', 'select');
            this.triggerElement.setAttribute('aria-controls', this.id);
        }
    },
    created() {
        this.$on('option-click', (value) => {
            this.model = value;
            this.visible = false;
        });
    }
};
