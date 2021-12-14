import IFormGroup from '../index.vue';
import IFormGroupBasicExample from './basic.vue';
import IFormGroupDisabledExample from './disabled.vue';
import IFormGroupNestingExample from './nesting.vue';
import IFormGroupNestingDisabledExample from './nesting-disabled.vue';
import IFormGroupNestingReadonlyExample from './nesting-readonly.vue';
import IFormGroupNestingSizeVariantsLgExample from './nesting-size-variants-lg.vue';
import IFormGroupSizeVariantsSmExample from './size-variants-sm.vue';
import IFormGroupSizeVariantsMdExample from './size-variants-md.vue';
import IFormGroupSizeVariantsLgExample from './size-variants-lg.vue';
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
