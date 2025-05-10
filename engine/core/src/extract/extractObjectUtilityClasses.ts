import type { UtilityClassEntry } from '../types';
import { VariantState } from '@inkline/types';
import { toKebabCase } from '@inkline/utils';

const variantStates: VariantState[] = ['hover', 'focus', 'disabled', 'active'];

export function extractObjectUtilityClasses(
    source: string,
    state: VariantState = 'default'
): UtilityClassEntry[] {
    const utilityClasses: UtilityClassEntry[] = [];
    const keyValueRegex = /('[^']+'|"[^"]+"|[a-zA-Z0-9_]+)\s*:\s*('[^']+'|"[^"]+"|true)/g;

    let match: RegExpExecArray | null;
    while ((match = keyValueRegex.exec(source)) !== null) {
        const name = match[1].replace(/['"]/g, '');
        const value = match[2].replace(/['"]/g, '');

        utilityClasses.push({ name: toKebabCase(name), value, state });
    }

    return utilityClasses;
}

export function extractHelperFunctionUtilityClasses(source: string): UtilityClassEntry[] {
    const utilityClasses: UtilityClassEntry[] = [];

    const variantRegex = new RegExp(
        `defineVariant(${variantStates.map((v) => `\\.${v}`).join('|')})?\\s*\\(\\s*({[^}]+})\\s*\\)`,
        'g'
    );

    let match: RegExpExecArray | null;
    while ((match = variantRegex.exec(source)) !== null) {
        const state = (match[1] ?? ':default').slice(1) as VariantState;

        utilityClasses.push(...extractObjectUtilityClasses(match[2], state));
    }

    return utilityClasses;
}

export function extractVariantPropertyUtilityClasses(source: string): UtilityClassEntry[] {
    const utilityClasses: UtilityClassEntry[] = [];

    const variantRegex = new RegExp(
        `(${variantStates.map((v) => `:${v}`).join('|')})?:variant\\s*=\\s*['"]({[^}]+})['"]`,
        'g'
    );

    let match: RegExpExecArray | null;
    while ((match = variantRegex.exec(source)) !== null) {
        const state = (match[1] ?? ':default').slice(1) as VariantState;

        utilityClasses.push(...extractObjectUtilityClasses(match[2], state));
    }

    return utilityClasses;
}

export function extractCompiledVariantPropertyUtilityClasses(source: string): UtilityClassEntry[] {
    const utilityClasses: UtilityClassEntry[] = [];

    const variantRegex = new RegExp(
        `['"]?(${variantStates.map((v) => `${v}:`).join('|')})?variant['"]?\\s*:\\s*({[^}]+})`,
        'g'
    );

    let match: RegExpExecArray | null;
    while ((match = variantRegex.exec(source)) !== null) {
        const state = (match[1] ?? 'default:').slice(0, -1) as VariantState;

        utilityClasses.push(...extractObjectUtilityClasses(match[2], state));
    }

    return utilityClasses;
}
