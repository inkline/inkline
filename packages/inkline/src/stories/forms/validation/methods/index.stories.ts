import {
    IFormValidationMethodsGroupsObjectExample,
    IFormValidationMethodsGroupsArrayExample
} from '@inkline/inkline/stories/forms/validation/methods/index';
import { IForm } from '@inkline/inkline/components';

export default {
    component: IForm,
    title: 'Form Validation/Methods'
};

export const ObjectGroups = () => IFormValidationMethodsGroupsObjectExample;
export const ArrayGroups = () => IFormValidationMethodsGroupsArrayExample;
