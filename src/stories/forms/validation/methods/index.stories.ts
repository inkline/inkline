import IFormValidationMethodsGroupsObjectExample from './groups-object.vue';
import IFormValidationMethodsGroupsArrayExample from './groups-array.vue';
import { IForm } from '@inkline/inkline/components';

export default {
    component: IForm,
    title: 'Form Validation/Methods'
};

export const ObjectGroups = () => IFormValidationMethodsGroupsObjectExample;
export const ArrayGroups = () => IFormValidationMethodsGroupsArrayExample;
