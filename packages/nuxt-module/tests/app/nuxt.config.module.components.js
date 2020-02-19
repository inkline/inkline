import merge from 'merge';
import config from './nuxt.config.module.default';

export default merge(config, {
    buildDir: 'dist-module-components',
    inkline: {
        scss: true,
        treeShaking: true,
        components: [
            'IContainer',
            'IRow',
            'IColumn',
            'IButton',
            'IForm',
            'IFormGroup',
            'IInput',
            'ITextarea',
            'ISelect',
            'ISelectOption',
            'ICheckboxGroup',
            'ICheckbox',
            'IRadioGroup',
            'IRadio'
        ]
    }
})
