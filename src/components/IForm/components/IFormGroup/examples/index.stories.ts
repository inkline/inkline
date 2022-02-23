import IFormGroup from '../index.vue';
import {
    IFormGroupBasicExample,
    IFormGroupDisabledExample,
    IFormGroupNestingExample,
    IFormGroupNestingDisabledExample,
    IFormGroupNestingReadonlyExample,
    IFormGroupNestingSizeVariantsLgExample,
    IFormGroupSizeVariantsSmExample,
    IFormGroupSizeVariantsMdExample,
    IFormGroupSizeVariantsLgExample
} from './index';
import { colorArgType, createStory, sizeArgType } from '@inkline/inkline/__storybook__';

export default {
    component: IFormGroup,
    title: 'Forms/Form Group',
    argTypes: {
        ...colorArgType(['light', 'dark']),
        ...sizeArgType()
    }
};

export const Basic = createStory(IFormGroupBasicExample);
export const Disabled = () => IFormGroupDisabledExample;
export const Nesting = () => IFormGroupNestingExample;
export const NestingDisabled = () => IFormGroupNestingDisabledExample;
export const NestingReadonly = () => IFormGroupNestingReadonlyExample;
export const NestingSizeVariantsLg = () => IFormGroupNestingSizeVariantsLgExample;
export const SizeVariantsSm = () => IFormGroupSizeVariantsSmExample;
export const SizeVariantsMd = () => IFormGroupSizeVariantsMdExample;
export const SizeVariantsLg = () => IFormGroupSizeVariantsLgExample;
