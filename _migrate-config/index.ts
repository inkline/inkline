import { defineThemes } from '../../../utils';
import { defaultTheme } from './default';
import { darkTheme } from './dark';

export const defaultThemes = defineThemes({
    default: defaultTheme,
    dark: darkTheme
});
