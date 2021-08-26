import { inklineGlobals, defaultOptions as defaultPrototypeOptions, createPrototype } from '../src/plugin';

jest.mock('@inkline/icons', () => ({}));
jest.mock('@inkline/icons/packs/inkline', () => ({}));
jest.mock('@inkline/icons/components/index', () => ({}));

inklineGlobals.prototype = createPrototype(defaultPrototypeOptions);
