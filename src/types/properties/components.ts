import type { RawThemeElement, ResolvedThemeElement } from './elements';

export type ThemeComponentName = 'button' | string;

export interface RawThemeComponent extends RawThemeElement {}

export interface ResolvedThemeComponent extends ResolvedThemeElement {}
