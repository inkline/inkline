import { IFormGroup } from '@inkline/inkline/components';
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
import { colorArgType,  sizeArgType } from '@inkline/inkline/__storybook__';
import { createStory } from '@inkline/paper/storybook';

export default {
    component: IFormGroup,
    title: 'Forms/Form Group',
    argTypes: {
        ...colorArgType(['light', 'dark']),
        ...sizeArgType()
    }
};

export const Basic = createStory(IFormGroupBasicExample);
export const Disabled = createStory(IFormGroupDisabledExample);
export const Nesting = createStory(IFormGroupNestingExample);
export const NestingDisabled = createStory(IFormGroupNestingDisabledExample);
export const NestingReadonly = createStory(IFormGroupNestingReadonlyExample);
export const NestingSizeVariants = createStory(IFormGroupNestingSizeVariantsLgExample);
export const SizeVariantsSm = createStory(IFormGroupSizeVariantsSmExample);
export const SizeVariantsMd = createStory(IFormGroupSizeVariantsMdExample);
export const SizeVariantsLg = createStory(IFormGroupSizeVariantsLgExample);
