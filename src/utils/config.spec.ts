import { defaultConfig } from '../presets';
import { defineConfig } from './config';

describe('defineConfig', () => {
    it('should return the same config that was passed in', () => {
        const result = defineConfig(defaultConfig);
        expect(result).toBe(defaultConfig);
    });
});
