import { resolveImportPath } from './resolveImports';
import type { TsConfig } from './loadTsconfig';
import path from 'path';
import fs from 'fs';

describe('resolveImportPath', () => {
    const extname = 'ts';
    const tsconfigDir = '/root/workspace';
    const tsconfig: TsConfig = {
        compilerOptions: {
            baseUrl: '.',
            rootDir: './src',
            outDir: './lib',
            paths: {
                '@alias/*': ['./src/*']
            }
        },
        dirname: tsconfigDir
    };

    it('should resolve relative file imports', () => {
        const result = resolveImportPath('./utils', {
            filePath: path.resolve(tsconfigDir, './lib/index.ts'),
            tsconfig,
            extname
        });
        expect(result).toBe('./utils.ts');
    });

    it('should resolve relative directory imports', () => {
        vi.spyOn(fs, 'existsSync').mockReturnValueOnce(true);
        const result = resolveImportPath('./utils', {
            filePath: path.resolve(tsconfigDir, './lib/index.ts'),
            tsconfig,
            extname
        });
        expect(result).toBe('./utils/index.ts');
    });

    it('should resolve tsconfig paths aliases for files', () => {
        const result = resolveImportPath('@alias/utils', {
            filePath: path.resolve(tsconfigDir, './lib/index.ts'),
            tsconfig,
            extname
        });
        expect(result).toBe('./utils.ts');
    });

    it('should resolve tsconfig paths aliases for directories', () => {
        vi.spyOn(fs, 'existsSync').mockReturnValueOnce(true);
        const result = resolveImportPath('@alias/utils', {
            filePath: path.resolve(tsconfigDir, './lib/index.ts'),
            tsconfig,
            extname
        });
        expect(result).toBe('./utils/index.ts');
    });

    it('should resolve tsconfig paths aliases for directories with overlapping path', () => {
        const result = resolveImportPath('@alias/components/alert', {
            filePath: path.resolve(tsconfigDir, './lib/components/index.ts'),
            tsconfig,
            extname
        });
        expect(result).toBe('./alert.ts');
    });

    it('should resolve tsconfig paths aliases for relative nested imports', () => {
        const result = resolveImportPath('@alias/components/alert/component', {
            filePath: path.resolve(tsconfigDir, './lib/components/modal/utils/popup.ts'),
            tsconfig,
            extname
        });
        expect(result).toBe('../../alert/component.ts');
    });

    it('should resolve tsconfig paths aliases for relative nested imports with overlapping path', () => {
        const result = resolveImportPath('@alias/components/alert/component', {
            filePath: path.resolve(tsconfigDir, './lib/components/alert/index.ts'),
            tsconfig,
            extname
        });
        expect(result).toBe('./component.ts');
    });

    it('should not add extension if it already exists', () => {
        const result = resolveImportPath('./utils.ts', {
            filePath: './lib/index.ts',
            tsconfig,
            extname
        });
        expect(result).toBe('./utils.ts');
    });

    it('should not resolve package imports', () => {
        const result = resolveImportPath('package', {
            filePath: path.resolve(tsconfigDir, './lib/index.ts'),
            tsconfig,
            extname
        });
        expect(result).toBe('package');
    });

    it('should not resolve scoped package imports', () => {
        const result = resolveImportPath('@scope/package', {
            filePath: path.resolve(tsconfigDir, './lib/index.ts'),
            tsconfig,
            extname
        });
        expect(result).toBe('@scope/package');
    });
});
