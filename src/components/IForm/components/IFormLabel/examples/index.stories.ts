import IFormLabel from '../index.vue';
import IFormLabelBasicExample from './basic.vue';
import IFormLabelDisabledExample from './disabled.vue';
import IFormLabelPlacementExample from './placement.vue';
import IFormLabelRequiredExample from './required.vue';
import IFormLabelSizeVariantsExample from './size-variants.vue';
import { createStory, sizeArgType } from '@inkline/inkline/__storybook__';

export default {
    component: IFormLabel,
    title: 'Forms/Form Label',
    argTypes: {
        ...sizeArgType()
    }
};

export const Basic = createStory(IFormLabelBasicExample);
export const Disabled = () => IFormLabelDisabledExample;
export const Placement = () => IFormLabelPlacementExample;
export const Required = () => IFormLabelRequiredExample;
export const SizeVariants = () => IFormLabelSizeVariantsExample;
