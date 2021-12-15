import {
    IFormValidationSchemaDefaultValueExample,
    IFormValidationSchemaValidationMessageExample,
    IFormValidationSchemaValidationEventExample,
    IFormValidationSchemaErrorVisibilityExample,
    IFormValidationSchemaGroupsObjectExample,
    IFormValidationSchemaGroupsArrayExample
} from './index';
import { IForm } from '@inkline/inkline/components';

export default {
    component: IForm,
    title: 'Form Validation/Schema'
};

export const ObjectGroups = () => IFormValidationSchemaDefaultValueExample;
export const DefaultValue = () => IFormValidationSchemaDefaultValueExample;
export const ValidationMessage = () => IFormValidationSchemaValidationMessageExample;
export const ValidationEvent = () => IFormValidationSchemaValidationEventExample;
export const ErrorVisibility = () => IFormValidationSchemaErrorVisibilityExample;
export const GroupsObject = () => IFormValidationSchemaGroupsObjectExample;
export const GroupsArray = () => IFormValidationSchemaGroupsArrayExample;
