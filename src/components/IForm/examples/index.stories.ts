import IForm from '../IForm.vue';
import {
    IFormBasicExample,
    IFormDisabledExample,
    IFormReadonlyExample,
    IFormSizeVariantsSmExample,
    IFormSizeVariantsMdExample,
    IFormSizeVariantsLgExample
} from './index';
import {
    colorArgType,
    createStory,
    sizeArgType,
    createExampleStory
} from '@inkline/inkline/__storybook__';

export default {
    component: IForm,
    title: 'Forms/Form',
    argTypes: {
        ...colorArgType(['light', 'dark']),
        ...sizeArgType()
    }
};

export const Basic = createStory(IFormBasicExample);
// export const Disabled = createExampleStory(IFormDisabledExample);
// export const Readonly = createExampleStory(IFormReadonlyExample);
// export const SizeVariantsSm = createExampleStory(IFormSizeVariantsSmExample);
// export const SizeVariantsMd = createExampleStory(IFormSizeVariantsMdExample);
// export const SizeVariantsLg = createExampleStory(IFormSizeVariantsLgExample);
