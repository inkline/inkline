import ILinkable from '@inkline/inkline/src/components/ILinkable';
import ILoader from '@inkline/inkline/src/components/ILoader';

import {
    AttributesProviderMixin,
    ClassesProviderMixin,
    InjectParentFormProviderMixin,
    EmitClickMethodMixin,
    EmitFocusMethodMixin,
    EmitHoverMethodMixin,
    DisabledFormPropertyMixin,
    LoadingPropertyMixin,
    SizePropertyMixin,
    TabIndexPropertyMixin,
    VariantPropertyMixin
} from '@inkline/inkline/src/mixins';

export default {
    name: 'IButton',
    extends: ILinkable,
    components: {
        ILoader,
    },
    mixins: [
        AttributesProviderMixin,
        ClassesProviderMixin,
        InjectParentFormProviderMixin,

        EmitClickMethodMixin,
        EmitFocusMethodMixin,
        EmitHoverMethodMixin,

        DisabledFormPropertyMixin,
        LoadingPropertyMixin,
        SizePropertyMixin,
        TabIndexPropertyMixin,
        VariantPropertyMixin
    ],
    props: {
        block: {
            type: Boolean,
            default: false
        },
        circle: {
            type: Boolean,
            default: false
        },
        link: {
            type: Boolean,
            default: false
        },
        outline: {
            type: Boolean,
            default: false
        },
        tag: {
            type: String,
            default: 'button'
        }
    },
    created() {
        this.classesProvider.add(() => ({
            '-block': this.block,
            '-circle': this.circle,
            '-link': this.link,
            '-outline': this.outline
        }));

        this.attributesProvider.add(() => ({ 'aria-pressed': this.active ? 'true' : false }));
    }
};
