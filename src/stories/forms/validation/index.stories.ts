import {
    IFormValidationBasicExample,
    IFormValidationBasicBindingExample,
    IFormValidationBasicValidatorsExample
} from './index';
import { colorArgType, createStory, sizeArgType } from '@inkline/inkline/__storybook__';
import { IForm } from '@inkline/inkline/components';

export default {
    component: IForm,
    title: 'Form Validation/Introduction',
    argTypes: {
        ...colorArgType(['light', 'dark']),
        ...sizeArgType()
    }
};

export const Basic = createStory(IFormValidationBasicExample);
export const BasicBinding = () => IFormValidationBasicBindingExample;
export const BasicValidators = () => IFormValidationBasicValidatorsExample;
