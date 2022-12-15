import IFormError from '@inkline/inkline/src/components/IFormError';
import {
    AttributesProviderMixin,
    ClassesProviderMixin,
    InjectParentFormProviderMixin,
    EmitInputMethodMixin,
    DisabledFormPropertyMixin,
    LoadingPropertyMixin,
    NamePropertyMixin,
    ParentFormGroupPropertyMixin,
    ReadonlyPropertyMixin,
    SizePropertyMixin,
    TabIndexPropertyMixin
} from '@inkline/inkline/src/mixins';
import { FormBuilder } from '@inkline/inkline/src/factories/FormBuilder';

export default {
    name: 'IFormGroup',
    mixins: [
        AttributesProviderMixin,
        ClassesProviderMixin,
        InjectParentFormProviderMixin,

        EmitInputMethodMixin,

        DisabledFormPropertyMixin,
        LoadingPropertyMixin,
        NamePropertyMixin,
        ParentFormGroupPropertyMixin,
        ReadonlyPropertyMixin,
        SizePropertyMixin,
        TabIndexPropertyMixin
    ],
    components: {
        IFormError
    },
    props: {
        inline: {
            type: Boolean,
            default: false
        },
        validate: {
            type: Boolean,
            default: true
        }
    },
    data() {
        return {
            inputSchema: null
        };
    },
    created() {
        this.classesProvider.add(() => ({
            '-inline': this.inline,
            '-error': this.inputSchema && this.inputSchema[FormBuilder.keys.INVALID],
            '-required':
                this.inputSchema &&
                this.inputSchema[FormBuilder.keys.VALIDATORS] &&
                this.inputSchema[FormBuilder.keys.VALIDATORS].some(v => v.rule === 'required')
        }));
    }
};
