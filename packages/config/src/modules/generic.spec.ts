import { generateGeneric, genericFieldGenerator } from './generic';
import { createTestingGeneratorMeta } from '../__tests__/utils';
import { ClassificationType, ResolvedTheme } from '../types';

describe('generateGeneric', () => {
    it('should generate css variables for generic values', () => {
        const meta = createTestingGeneratorMeta({
            theme: {
                components: {
                    __type: ClassificationType.Group,
                    button: {
                        __type: ClassificationType.Element,
                        default: {
                            __type: ClassificationType.Group,
                            spacing: '1rem'
                        }
                    }
                }
            } as unknown as ResolvedTheme,
            path: ['components', 'button', 'default', 'spacing']
        });
        const result = generateGeneric('1rem', meta);
        expect(result).toEqual(['--button--spacing: 1rem;']);
    });
});

describe('genericFieldGenerator', () => {
    describe('generate', () => {
        it('should generate css variables for generic default variant values', () => {
            const meta = createTestingGeneratorMeta({
                theme: {
                    components: {
                        __type: ClassificationType.Group,
                        button: {
                            __type: ClassificationType.Element,
                            default: {
                                __type: ClassificationType.Group,
                                spacing: '1rem'
                            }
                        }
                    }
                } as unknown as ResolvedTheme,
                path: ['components', 'button', 'default', 'spacing']
            });
            const result = genericFieldGenerator.generate('1rem', meta);
            expect(result).toEqual(['--button--spacing: 1rem;']);
        });

        it('should generate css variables for generic non-default variant values', () => {
            const meta = createTestingGeneratorMeta({
                theme: {
                    components: {
                        __type: ClassificationType.Group,
                        button: {
                            __type: ClassificationType.Element,
                            primary: {
                                __type: ClassificationType.Group,
                                spacing: '1rem'
                            }
                        }
                    }
                } as unknown as ResolvedTheme,
                path: ['components', 'button', 'primary', 'spacing']
            });
            const result = genericFieldGenerator.generate('1rem', meta);
            expect(result).toEqual(['--button--primary--spacing: 1rem;']);
        });

        it('should generate css variables for generic primitive values', () => {
            const meta = createTestingGeneratorMeta({
                theme: {
                    unknown: '3px'
                } as unknown as ResolvedTheme,
                path: ['unknown']
            });
            const result = genericFieldGenerator.generate('3px', meta);
            expect(result).toEqual(['--unknown: 3px;']);
        });
    });

    describe('match', () => {
        it.each([
            ['components', true],
            ['components.button', true],
            ['components.button.spacing', true],
            ['other.path.value', true]
        ])('should match "%s" path => %s', (path, result) => {
            const match = (genericFieldGenerator.key as RegExp).test(path);
            expect(match).toBe(result);
        });
    });
});
