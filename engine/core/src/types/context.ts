import type { Themes } from './tokens';
import type { OutputFile } from './generators';

export type Context = {
    id: string;
    themes: Themes;
    files: OutputFile[];
};
