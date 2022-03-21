import { IFormLabel } from '@inkline/inkline/components';
import {
    IFormLabelBasicExample,
    IFormLabelDisabledExample,
    IFormLabelPlacementExample,
    IFormLabelRequiredExample,
    IFormLabelSizeVariantsExample
} from './index';
import {  sizeArgType } from '@inkline/inkline/__storybook__';
import { createStory } from '@inkline/paper/storybook';

export default {
    component: IFormLabel,
    title: 'Forms/Form Label',
    argTypes: {
        ...sizeArgType()
    }
};

export const Basic = createStory(IFormLabelBasicExample);
export const Disabled = createStory(IFormLabelDisabledExample);
export const Placement = createStory(IFormLabelPlacementExample);
export const Required = createStory(IFormLabelRequiredExample);
export const SizeVariants = createStory(IFormLabelSizeVariantsExample);
