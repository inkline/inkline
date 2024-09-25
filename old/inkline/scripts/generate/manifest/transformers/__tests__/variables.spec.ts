import type { ManifestCSSVariable } from '../../types';
import { mapDefinedCssVariablesToUsedCssVariables } from '../variables';

describe('mapDefinedCssVariablesToUsedCssVariables', () => {
    it('should correctly map parts to parent property', () => {
        const definedCssVariables: ManifestCSSVariable[] = [
            { name: '--alert--padding-top', value: '10px' },
            { name: '--alert--padding-right', value: '10px' },
            { name: '--alert--padding-bottom', value: '10px' },
            { name: '--alert--padding-left', value: '10px' }
        ];

        const usedCssVariables: ManifestCSSVariable[] = [{ name: '--alert--padding' }];

        const result = mapDefinedCssVariablesToUsedCssVariables(
            definedCssVariables,
            usedCssVariables
        );

        expect(result).toEqual([
            {
                name: '--alert--padding',
                value: [
                    { name: '--alert--padding-top', value: '10px' },
                    { name: '--alert--padding-right', value: '10px' },
                    { name: '--alert--padding-bottom', value: '10px' },
                    { name: '--alert--padding-left', value: '10px' }
                ]
            }
        ]);
    });

    it('should correctly map variants to parent property', () => {
        const definedCssVariables: ManifestCSSVariable[] = [
            { name: '--alert--color-h', value: '100' },
            { name: '--alert--color-s', value: '20%' },
            { name: '--alert--color-l', value: '30%' },
            { name: '--alert--color-a', value: '1' },
            { name: '--alert--info--color-h', value: '200' },
            { name: '--alert--info--color-s', value: '50%' },
            { name: '--alert--info--color-l', value: '50%' },
            { name: '--alert--info--color-a', value: '1' }
        ];

        const usedCssVariables: ManifestCSSVariable[] = [{ name: '--alert--color' }];

        const result = mapDefinedCssVariablesToUsedCssVariables(
            definedCssVariables,
            usedCssVariables
        );

        expect(result).toEqual([
            {
                name: '--alert--color',
                value: [
                    { name: '--alert--color-h', value: '100' },
                    { name: '--alert--color-s', value: '20%' },
                    { name: '--alert--color-l', value: '30%' },
                    { name: '--alert--color-a', value: '1' }
                ],
                variants: [
                    {
                        name: '--alert--info--color',
                        value: [
                            { name: '--alert--info--color-h', value: '200' },
                            { name: '--alert--info--color-s', value: '50%' },
                            { name: '--alert--info--color-l', value: '50%' },
                            { name: '--alert--info--color-a', value: '1' }
                        ]
                    }
                ]
            }
        ]);
    });

    it('should correctly determine whether a variable is a part or a variant (1)', () => {
        const definedCssVariables: ManifestCSSVariable[] = [
            { name: '--alert--color-h', value: '100' },
            { name: '--alert--color-s', value: '20%' },
            { name: '--alert--color-l', value: '30%' },
            { name: '--alert--color-a', value: '1' },
            { name: '--alert--info--color-h', value: '200' },
            { name: '--alert--info--color-s', value: '50%' },
            { name: '--alert--info--color-l', value: '50%' },
            { name: '--alert--info--color-a', value: '1' },
            { name: '--alert--icon--color-h', value: '200' },
            { name: '--alert--icon--color-s', value: '50%' },
            { name: '--alert--icon--color-l', value: '50%' },
            { name: '--alert--icon--color-a', value: '1' }
        ];

        const usedCssVariables: ManifestCSSVariable[] = [
            { name: '--alert--color' },
            { name: '--alert--icon--color' }
        ];

        const result = mapDefinedCssVariablesToUsedCssVariables(
            definedCssVariables,
            usedCssVariables
        );

        expect(result).toEqual([
            {
                name: '--alert--color',
                value: [
                    { name: '--alert--color-h', value: '100' },
                    { name: '--alert--color-s', value: '20%' },
                    { name: '--alert--color-l', value: '30%' },
                    { name: '--alert--color-a', value: '1' }
                ],
                variants: [
                    {
                        name: '--alert--info--color',
                        value: [
                            { name: '--alert--info--color-h', value: '200' },
                            { name: '--alert--info--color-s', value: '50%' },
                            { name: '--alert--info--color-l', value: '50%' },
                            { name: '--alert--info--color-a', value: '1' }
                        ]
                    }
                ]
            },
            {
                name: '--alert--icon--color',
                value: [
                    { name: '--alert--icon--color-h', value: '200' },
                    { name: '--alert--icon--color-s', value: '50%' },
                    { name: '--alert--icon--color-l', value: '50%' },
                    { name: '--alert--icon--color-a', value: '1' }
                ]
            }
        ]);
    });

    it('should correctly determine whether a variable is a part or a variant (2)', () => {
        const definedCssVariables: ManifestCSSVariable[] = [
            { name: '--alert--font-weight', value: 'bold' },
            { name: '--alert--title--font-weight', value: 'bold' },
            { name: '--alert--link--font-weight', value: 'bold' }
        ];

        const usedCssVariables: ManifestCSSVariable[] = [
            { name: '--alert--font-weight' },
            { name: '--alert--title--font-weight' },
            { name: '--alert--link--font-weight' }
        ];

        const result = mapDefinedCssVariablesToUsedCssVariables(
            definedCssVariables,
            usedCssVariables
        );

        expect(result).toEqual([
            { name: '--alert--font-weight', value: 'bold' },
            { name: '--alert--title--font-weight', value: 'bold' },
            { name: '--alert--link--font-weight', value: 'bold' }
        ]);
    });
});
