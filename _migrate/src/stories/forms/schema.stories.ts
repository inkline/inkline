import {
    FormValidationSchemaDefaultValueExample,
    FormValidationSchemaValidationMessageExample,
    FormValidationSchemaValidationEventExample,
    FormValidationSchemaErrorVisibilityExample,
    FormValidationSchemaGroupsObjectExample,
    FormValidationSchemaGroupsArrayExample
} from '@inkline/inkline/examples/forms/schema';
import { Form } from '@inkline/inkline/components';

export default {
    component: Form,
    title: 'Form Validation/Schema'
};

export const DefaultValue = () => FormValidationSchemaDefaultValueExample;
export const ValidationMessage = () => FormValidationSchemaValidationMessageExample;
export const ValidationEvent = () => FormValidationSchemaValidationEventExample;
export const ErrorVisibility = () => FormValidationSchemaErrorVisibilityExample;
export const GroupsObject = () => FormValidationSchemaGroupsObjectExample;
export const GroupsArray = () => FormValidationSchemaGroupsArrayExample;
