import Form from '@inkline/inkline/components/Form/Form.vue';
import {
    FormBasicExample,
    FormDisabledExample,
    FormReadonlyExample,
    FormSizeVariantsSmExample,
    FormSizeVariantsMdExample,
    FormSizeVariantsLgExample
} from '@inkline/inkline/components/Form/examples/index';
import {
    colorArgType,
    createStory,
    sizeArgType,
    createExampleStory
} from '@inkline/inkline/__storybook__';

export default {
    component: Form,
    title: 'Forms/Form',
    argTypes: {
        ...colorArgType(['light', 'dark']),
        ...sizeArgType()
    }
};

export const Basic = createStory(FormBasicExample);
export const Disabled = createExampleStory(FormDisabledExample);
export const Readonly = createExampleStory(FormReadonlyExample);
export const SizeVariantsSm = createExampleStory(FormSizeVariantsSmExample);
export const SizeVariantsMd = createExampleStory(FormSizeVariantsMdExample);
export const SizeVariantsLg = createExampleStory(FormSizeVariantsLgExample);
