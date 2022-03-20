import { IForm } from '@inkline/inkline/components';
import {
    IFormBasicExample,
    IFormDisabledExample,
    IFormReadonlyExample,
    IFormSizeVariantsSmExample,
    IFormSizeVariantsMdExample,
    IFormSizeVariantsLgExample
} from './index';
import { colorArgType,  sizeArgType } from '@inkline/inkline/__storybook__';
import { createStory } from '@inkline/paper/storybook';

export default {
    component: IForm,
    title: 'Forms/Form',
    argTypes: {
        ...colorArgType(['light', 'dark']),
        ...sizeArgType()
    }
};

export const Basic = createStory(IFormBasicExample);
export const Disabled = createStory(IFormDisabledExample);
export const Readonly = createStory(IFormReadonlyExample);
export const SizeVariantsSm = createStory(IFormSizeVariantsSmExample);
export const SizeVariantsMd = createStory(IFormSizeVariantsMdExample);
export const SizeVariantsLg = createStory(IFormSizeVariantsLgExample);
