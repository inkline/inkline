import FormGroup from '@inkline/inkline/components/FormGroup/FormGroup.vue';
import {
    FormGroupBasicExample,
    FormGroupDisabledExample,
    FormGroupNestingExample,
    FormGroupNestingDisabledExample,
    FormGroupNestingReadonlyExample,
    FormGroupNestingSizeVariantsLgExample,
    FormGroupSizeVariantsSmExample,
    FormGroupSizeVariantsMdExample,
    FormGroupSizeVariantsLgExample
} from '@inkline/inkline/components/FormGroup/examples/index';
import { colorArgType, createStory, sizeArgType } from '@inkline/inkline/__storybook__';

export default {
    component: FormGroup,
    title: 'Forms/Form Group',
    argTypes: {
        ...colorArgType(['light', 'dark']),
        ...sizeArgType()
    }
};

export const Basic = createStory(FormGroupBasicExample);
export const Disabled = () => FormGroupDisabledExample;
export const Nesting = () => FormGroupNestingExample;
export const NestingDisabled = () => FormGroupNestingDisabledExample;
export const NestingReadonly = () => FormGroupNestingReadonlyExample;
export const NestingSizeVariants = () => FormGroupNestingSizeVariantsLgExample;
export const SizeVariantsSm = () => FormGroupSizeVariantsSmExample;
export const SizeVariantsMd = () => FormGroupSizeVariantsMdExample;
export const SizeVariantsLg = () => FormGroupSizeVariantsLgExample;
