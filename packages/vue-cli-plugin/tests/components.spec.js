import { vueCLIBuild } from "./jest/helpers/vueCLIBuild";

const components = [
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
];
const generator = (api) => {
    api.injectImports(api.entryFile, `import { Inkline } from '@inkline/inkline/src'`);
    api.injectImports(api.entryFile, `import { ${components.join(', ')} } from '@inkline/inkline/src/components'`);
    api.injectImports(api.entryFile, `\nVue.use(Inkline, { components: { ${components.join(', ')} } });`);
};

describe('Vue CLI Module', () => {
    it('should build plugin with components config enabled', vueCLIBuild('main.components', generator));

    it('should build typescript plugin with components config enabled', vueCLIBuild('main.components', generator, { typescript: true }));
});
