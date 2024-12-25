import FormLabel from '@inkline/inkline/components/FormLabel/FormLabel.vue';
import {
    FormLabelBasicExample,
    FormLabelDisabledExample,
    FormLabelPlacementExample,
    FormLabelRequiredExample,
    FormLabelSizeVariantsExample
} from '@inkline/inkline/components/FormLabel/examples/index';
import { createStory, sizeArgType } from '@inkline/inkline/__storybook__';

export default {
    component: FormLabel,
    title: 'Forms/Form Label',
    argTypes: {
        ...sizeArgType()
    }
};

export const Basic = createStory(FormLabelBasicExample);
export const Disabled = () => FormLabelDisabledExample;
export const Placement = () => FormLabelPlacementExample;
export const Required = () => FormLabelRequiredExample;
export const SizeVariants = () => FormLabelSizeVariantsExample;
