import IFormLabel from '@inkline/inkline/components/IFormLabel/IFormLabel.vue';
import {
    IFormLabelBasicExample,
    IFormLabelDisabledExample,
    IFormLabelPlacementExample,
    IFormLabelRequiredExample,
    IFormLabelSizeVariantsExample
} from '@inkline/inkline/components/IFormLabel/examples/index';
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
