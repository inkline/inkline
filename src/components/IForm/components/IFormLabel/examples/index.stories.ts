import IFormLabel from '../index.vue';
import {
    IFormLabelBasicExample,
    IFormLabelDisabledExample,
    IFormLabelPlacementExample,
    IFormLabelRequiredExample,
    IFormLabelSizeVariantsExample
} from './index';
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
