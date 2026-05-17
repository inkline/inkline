import type { Themes } from './tokens';
import type { OutputFile } from './generators';

export type Context = {
    themes: Themes;
    files: OutputFile[];
};
