import { Configuration } from './build';

export type OutputFile = {
    id?: string;
    path: string;
    content: string;
    options?: {
        append?: boolean;
        prepend?: boolean;
    };
};

export interface Generator<T> {
    (configuration: Configuration<T>): OutputFile[];
}
