import { codegenIndent } from '../indent';

describe('helpers', () => {
    describe('codegen', () => {
        describe('codegenIndent', () => {
            it('should return string with added indentation', () => {
                expect(codegenIndent('example')).toEqual('    example');
                expect(codegenIndent('example', 2)).toEqual('  example');
                expect(codegenIndent('example', 2, 'x')).toEqual('xxexample');
            });
        });
    });
});
