import Vue from 'vue';
import { Inkline } from '@inkline/inkline/src';
import {
    IContainer,
    IRow,
    IColumn,
    IButton,
    IForm,
    IFormGroup,
    IInput,
    ITextarea,
    ISelect,
    ISelectOption,
    ICheckboxGroup,
    ICheckbox,
    IRadioGroup,
    IRadio
} from '@inkline/inkline/src/components';
import '@inkline/inkline/src/inkline.scss';

Vue.use(Inkline, {
    components: {
        IContainer,
        IRow,
        IColumn,
        IButton,
        IForm,
        IFormGroup,
        IInput,
        ITextarea,
        ISelect,
        ISelectOption,
        ICheckboxGroup,
        ICheckbox,
        IRadioGroup,
        IRadio
    }
});
