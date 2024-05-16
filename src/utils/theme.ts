import type { RawTheme } from '../types';
import type { PartialDeep } from 'type-fest';

export function defineThemes<Themes extends Record<string, PartialDeep<RawTheme>>>(
    themes: Themes
): Themes {
    return themes;
}
