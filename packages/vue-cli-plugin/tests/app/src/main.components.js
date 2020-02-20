import Vue from 'vue';
import App from './App.vue';
import { Inkline } from '@inkline/inkline/src'
import { IContainer, IRow, IColumn, IButton, IForm, IFormGroup, IInput, ITextarea, ISelect, ISelectOption, ICheckboxGroup, ICheckbox, IRadioGroup, IRadio } from '@inkline/inkline/src/components'

Vue.use(Inkline, { components: { IContainer, IRow, IColumn, IButton, IForm, IFormGroup, IInput, ITextarea, ISelect, ISelectOption, ICheckboxGroup, ICheckbox, IRadioGroup, IRadio } });

Vue.config.productionTip = false;

new Vue({
  render: h => h(App),
}).$mount('#app');
