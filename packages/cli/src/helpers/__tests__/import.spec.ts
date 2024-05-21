import {
    addFieldToDefaultExport,
    addImport,
    importFromExists,
    insertImport,
    updateExistingImport
} from '../import';

const exampleSingleLineImportCode = `import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';

createApp(App)
  .use(store)
  .use(router)
  .mount('#app');`;

const exampleMultiLineImportCode = `import { createApp } from 'vue';
import App from './App.vue';
import {
    IButton,
    ICheckbox,
    ILayout
} from '@inkline/inkline';

createApp(App)
  .mount('#app');`;

const exampleDefaultExportSingleLineCode = `import { defineConfig } from 'vite';

export default defineConfig({});`;

const exampleDefaultExportMultiLineCode = `import { defineConfig } from 'vite';

export default defineConfig({
    modules: ['example']
});`;

const exampleDefaultExportMultiLineCodeComplex = `import { defineConfig } from 'vite';

export default defineConfig({
    modules: [
        exampleA,
        exampleB,
        exampleC
    ]
});`;

describe('importFromExists', () => {
    it('should return true if the single line import exists', () => {
        const result = importFromExists(exampleSingleLineImportCode, {
            from: 'vue'
        });
        expect(result).toBe(true);
    });

    it('should return true if the multi line import exists', () => {
        const result = importFromExists(exampleMultiLineImportCode, {
            from: '@inkline/inkline'
        });
        expect(result).toBe(true);
    });

    it('should return false if the import does not exist', () => {
        const result = importFromExists(exampleSingleLineImportCode, {
            from: 'pinia'
        });
        expect(result).toBe(false);
    });
});

describe('insertImport', () => {
    it('should insert a default import', () => {
        const result = insertImport(exampleSingleLineImportCode, {
            name: 'Pinia',
            from: 'pinia'
        });

        expect(result).toContain(`import Pinia from 'pinia';`);
        expect(result).toMatchSnapshot();
    });

    it('should insert a named import', () => {
        const result = insertImport(exampleSingleLineImportCode, {
            name: ['createPinia'],
            from: 'pinia'
        });

        expect(result).toContain(`import { createPinia } from 'pinia';`);
        expect(result).toMatchSnapshot();
    });

    it('should insert multiple named imports', () => {
        const result = insertImport(exampleSingleLineImportCode, {
            name: ['createPinia', 'defineStore'],
            from: 'pinia'
        });

        expect(result).toContain(`import { createPinia, defineStore } from 'pinia';`);
        expect(result).toMatchSnapshot();
    });

    it('should insert a import when there are no other imports', () => {
        const result = insertImport(`const a = 1;`, {
            name: ['Inkline'],
            from: '@inkline/inkline'
        });

        expect(result).toContain(`import { Inkline } from '@inkline/inkline';`);
        expect(result).toMatchSnapshot();
    });
});

describe('updateExistingImport', () => {
    it('should update a single line named import', () => {
        const result = updateExistingImport(`import { createApp } from 'vue';`, {
            name: ['defineComponent'],
            from: 'vue'
        });

        expect(result).toEqual(`import { createApp, defineComponent } from 'vue';`);
    });

    it('should update a multi line named import', () => {
        const result = updateExistingImport(
            `import {\n  IButton,\n  ICheckbox,\n  ILayout\n} from '@inkline/inkline';`,
            {
                name: ['IColumn'],
                from: '@inkline/inkline'
            }
        );

        expect(result).toEqual(
            `import { IButton, ICheckbox, ILayout, IColumn } from '@inkline/inkline';`
        );
    });

    it('should update a default and named import', () => {
        const result = updateExistingImport(
            `import Inkline, {\n  IButton,\n  ICheckbox,\n  ILayout\n} from '@inkline/inkline';`,
            {
                name: ['IColumn'],
                from: '@inkline/inkline'
            }
        );

        expect(result).toEqual(
            `import Inkline, { IButton, ICheckbox, ILayout, IColumn } from '@inkline/inkline';`
        );
    });

    it('should add named imports to default import', () => {
        const result = updateExistingImport(`import Inkline from '@inkline/inkline';`, {
            name: ['IColumn'],
            from: '@inkline/inkline'
        });

        expect(result).toEqual(`import Inkline, { IColumn } from '@inkline/inkline';`);
    });

    it('should add default import to named imports', () => {
        const result = updateExistingImport(`import { IColumn } from '@inkline/inkline';`, {
            name: 'Inkline',
            from: '@inkline/inkline'
        });

        expect(result).toEqual(`import Inkline, { IColumn } from '@inkline/inkline';`);
    });
});

describe('addImport', () => {
    it('should insert a default import', () => {
        const result = addImport(exampleSingleLineImportCode, {
            name: 'Pinia',
            from: 'pinia'
        });

        expect(result).toContain(`import Pinia from 'pinia';`);
        expect(result).toMatchSnapshot();
    });

    it('should insert a named import', () => {
        const result = addImport(exampleSingleLineImportCode, {
            name: ['Inkline'],
            from: '@inkline/inkline'
        });

        expect(result).toContain(`import { Inkline } from '@inkline/inkline';`);
        expect(result).toMatchSnapshot();
    });

    it('should update a named single line import', () => {
        const result = addImport(exampleMultiLineImportCode, {
            name: ['defineComponent'],
            from: 'vue'
        });

        expect(result).toContain(`import { createApp, defineComponent } from 'vue';`);
        expect(result).toMatchSnapshot();
    });

    it('should update a named multi line import', () => {
        const result = addImport(exampleMultiLineImportCode, {
            name: ['IContainer'],
            from: '@inkline/inkline'
        });

        expect(result).toContain(
            `import { IButton, ICheckbox, ILayout, IContainer } from '@inkline/inkline';`
        );
        expect(result).toMatchSnapshot();
    });

    it('should add a default import to a named multi line import', () => {
        const result = addImport(exampleMultiLineImportCode, {
            name: 'Inkline',
            from: '@inkline/inkline'
        });

        expect(result).toContain(
            `import Inkline, { IButton, ICheckbox, ILayout } from '@inkline/inkline';`
        );
        expect(result).toMatchSnapshot();
    });
});

describe('addFieldToDefaultExport', () => {
    it('should add a field to a single-line default export', () => {
        const result = addFieldToDefaultExport(exampleDefaultExportSingleLineCode, 'plugins', [
            'Example'
        ]);

        expect(result).toContain(`plugins: [Example]`);
        expect(result).toMatchSnapshot();
    });

    it('should add a field to a multi-line default export', () => {
        const result = addFieldToDefaultExport(exampleDefaultExportMultiLineCode, 'plugins', [
            'Example'
        ]);

        console.log(result);

        expect(result).toContain(`plugins: [Example]`);
        expect(result).toMatchSnapshot();
    });

    it('should add a field to a multi-line default export with pre-existing value', () => {
        const result = addFieldToDefaultExport(exampleDefaultExportMultiLineCode, 'modules', [
            'Example'
        ]);

        expect(result).toContain(`modules: [Example, 'example']`);
        expect(result).toMatchSnapshot();
    });

    it('should add a field to a multi-line default export with pre-existing multi-line value', () => {
        const result = addFieldToDefaultExport(
            exampleDefaultExportMultiLineCodeComplex,
            'modules',
            ['Example']
        );

        console.log(result);

        expect(result).toContain(`modules: [Example,`);
        expect(result).toMatchSnapshot();
    });
});
