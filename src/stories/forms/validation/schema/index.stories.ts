import IFormValidationSchemaDefaultValueExample from './default-value.vue';
import IFormValidationSchemaValidationMessageExample from './validation-message.vue';
import IFormValidationSchemaValidationEventExample from './validation-event.vue';
import IFormValidationSchemaErrorVisibilityExample from './error-visibility.vue';
import IFormValidationSchemaGroupsObjectExample from './groups-object.vue';
import IFormValidationSchemaGroupsArrayExample from './groups-array.vue';
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
