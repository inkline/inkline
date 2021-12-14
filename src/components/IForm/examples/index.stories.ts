import IForm from '../index.vue';
import IFormBasicExample from './basic.vue';
import IFormDisabledExample from './disabled.vue';
import IFormReadonlyExample from './readonly.vue';
import IFormSizeVariantsSmExample from './size-variants-sm.vue';
import IFormSizeVariantsMdExample from './size-variants-md.vue';
import IFormSizeVariantsLgExample from './size-variants-lg.vue';
import { colorArgType, createStory, sizeArgType } from '@inkline/inkline/__storybook__';

export default {
    component: IForm,
    title: 'Forms/Form',
    argTypes: {
        ...colorArgType(['light', 'dark']),
        ...sizeArgType()
    }
};

export const Basic = createStory(IFormBasicExample);
export const Disabled = () => IFormDisabledExample;
export const Readonly = () => IFormReadonlyExample;
export const SizeVariantsSm = () => IFormSizeVariantsSmExample;
export const SizeVariantsMd = () => IFormSizeVariantsMdExample;
export const SizeVariantsLg = () => IFormSizeVariantsLgExample;
