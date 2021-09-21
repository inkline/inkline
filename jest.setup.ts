import '@testing-library/jest-dom';
import { inklineGlobals, defaultOptions as defaultPrototypeOptions, createPrototype } from './src/plugin';
import { defineComponent } from 'vue';
import { localStorageMock } from './src/__mocks__/localStorageMock';
import { matchMediaMock } from './src/__mocks__/matchMediaMock';

jest.mock('@inkline/icons', () => ({
    InklineIcons: {
        add: jest.fn()
    }
}));
jest.mock('@inkline/icons/packs/inkline', () => ({}));
jest.mock('@inkline/icons/components/index', () => ({}));

jest.mock('@inkline/icons/components', () => ({
    IIcon: defineComponent({
        template: '<i />'
    })
}));

inklineGlobals.prototype = createPrototype(defaultPrototypeOptions);

Object.defineProperty(global.window, 'localStorage', { value: localStorageMock });

Object.defineProperty(global.window, 'matchMedia', {
    writable: true,
    value: jest.fn().mockImplementation(matchMediaMock),
});
