import {
    FormValidationMethodsGroupsObjectExample,
    FormValidationMethodsGroupsArrayExample
} from '@inkline/inkline/examples/forms/methods';
import { Form } from '@inkline/inkline/components';

export default {
    component: Form,
    title: 'Form Validation/Methods'
};

export const ObjectGroups = () => FormValidationMethodsGroupsObjectExample;
export const ArrayGroups = () => FormValidationMethodsGroupsArrayExample;
