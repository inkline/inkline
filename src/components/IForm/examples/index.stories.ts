import IForm from '../index.vue';
import {
    IFormBasicExample,
    IFormDisabledExample,
    IFormReadonlyExample,
    IFormSizeVariantsSmExample,
    IFormSizeVariantsMdExample,
    IFormSizeVariantsLgExample
} from './index';
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
