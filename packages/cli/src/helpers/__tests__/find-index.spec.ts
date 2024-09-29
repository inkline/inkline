import { findLastImportLineIndex } from '../find-index';

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
} from '@inkline/vue';

createApp(App)
  .mount('#app');`;

describe('findLastImportLineIndexes', () => {
    it('should find the last import line indexes for single line imports', () => {
        const result = findLastImportLineIndex(exampleSingleLineImportCode);
        expect(result).toBe(3);
    });

    it('should find the last import line indexes for multi line imports', () => {
        const result = findLastImportLineIndex(exampleMultiLineImportCode);
        expect(result).toBe(6);
    });

    it('should return -1 if no import found', () => {
        const result = findLastImportLineIndex(`const a = 1;`);
        expect(result).toBe(-1);
    });
});
