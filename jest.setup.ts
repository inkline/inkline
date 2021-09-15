import '@testing-library/jest-dom';
import { inklineGlobals, defaultOptions as defaultPrototypeOptions, createPrototype } from './src/plugin';
import { defineComponent } from 'vue';

jest.mock('@inkline/icons', () => ({}));
jest.mock('@inkline/icons/packs/inkline', () => ({}));
jest.mock('@inkline/icons/components/index', () => ({}));

jest.mock('@inkline/icons/components', () => ({
    IIcon: defineComponent({
        template: '<i />'
    })
}));

inklineGlobals.prototype = createPrototype(defaultPrototypeOptions);


